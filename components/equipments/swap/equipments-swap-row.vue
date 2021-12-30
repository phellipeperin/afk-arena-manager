<template>
  <v-row>
    <v-col
      cols="5"
      class="d-flex align-center justify-center"
    >
      <equipments-visual-item
        :hero-type="hero1.gameInfo.type"
        :equip="hero1Equip"
      />
    </v-col>
    <v-col
      cols="2"
      class="d-flex align-center justify-center"
    >
      <v-btn
        fab
        small
        :disabled="loading"
        :loading="loading"
        color="accent"
        class="possible-hero__swap-button"
        @click="swap"
      >
        <v-icon>mdi-swap-horizontal</v-icon>
      </v-btn>
    </v-col>
    <v-col
      cols="5"
      class="d-flex align-center justify-center"
    >
      <equipments-visual-item
        :hero-type="hero2.gameInfo.type"
        :equip="hero2Equip"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';

interface ComponentData {
  currentHero1: Hero;
  currentHero2: Hero;
  loading: boolean;
}

export default Vue.extend({
  props: {
    hero1: { type: Hero, required: true },
    hero2: { type: Hero, required: true },
    equipType: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      currentHero1: new Hero(),
      currentHero2: new Hero(),
      loading: false,
    };
  },
  computed: {
    hero1Equip(): HeroEquip {
      return this.currentHero1.playerInfo.equipment.find((equip: HeroEquip) => equip.type === this.equipType as HeroEquipType) as HeroEquip || new HeroEquip();
    },
    hero2Equip(): HeroEquip {
      return this.currentHero2.playerInfo.equipment.find((equip: HeroEquip) => equip.type === this.equipType as HeroEquipType) as HeroEquip || new HeroEquip();
    },
  },
  created(): void {
    this.currentHero1 = this.hero1;
    this.currentHero2 = this.hero2;
  },
  methods: {
    async swap(): Promise<void> {
      this.loading = true;
      const userId = this.$store.state.user.user.id;
      const equipHero1Index = this.currentHero1.playerInfo.equipment.findIndex((equip: HeroEquip) => equip.type === this.equipType as HeroEquipType);
      const equipHero1 = this.currentHero1.playerInfo.equipment[equipHero1Index];
      const equipHero2Index = this.currentHero2.playerInfo.equipment.findIndex((equip: HeroEquip) => equip.type === this.equipType as HeroEquipType);
      const equipHero2 = this.currentHero2.playerInfo.equipment[equipHero2Index];

      this.currentHero1.playerInfo.equipment.splice(equipHero1Index, 1, equipHero2);
      this.currentHero2.playerInfo.equipment.splice(equipHero2Index, 1, equipHero1);
      try {
        const docRef1 = this.$fire.firestore.collection(`users/${userId}/heroes`).doc(this.currentHero1.id);
        const docRef2 = this.$fire.firestore.collection(`users/${userId}/heroes`).doc(this.currentHero2.id);
        await docRef1.update(JSON.parse(JSON.stringify(this.currentHero1.playerInfo)));
        await docRef2.update(JSON.parse(JSON.stringify(this.currentHero2.playerInfo)));

        this.$store.commit('hero/UPDATE_PLAYER_HERO', { id: userId, hero: this.currentHero1 });
        this.$store.commit('hero/UPDATE_PLAYER_HERO', { id: userId, hero: this.currentHero2 });
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Equipments swapped successfully');
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">

</style>
