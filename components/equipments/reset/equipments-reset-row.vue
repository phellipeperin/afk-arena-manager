<template>
  <v-row>
    <v-col
      cols="4"
      class="d-flex align-center justify-center"
    >
      <equipments-visual-item
        :hero-type="hero.gameInfo.type"
        :equip="heroEquip"
      />
    </v-col>
    <v-col
      v-if="heroEquip.tier >= 0"
      cols="8"
      class="d-flex align-center justify-center"
    >
      <ui-selector-faction
        :value="heroEquip.faction"
        @input="changeFaction"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { Faction } from '~/application/domain/info/faction';

interface ComponentData {
  currentHero: Hero;
  loading: boolean;
}

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
    equipType: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      currentHero: new Hero(),
      loading: false,
    };
  },
  computed: {
    heroEquip(): HeroEquip {
      return this.currentHero.playerInfo.equipment.find((equip: HeroEquip) => equip.type === this.equipType as HeroEquipType) as HeroEquip || new HeroEquip();
    },
  },
  created(): void {
    this.currentHero = this.hero;
  },
  methods: {
    async changeFaction(newFaction: Faction): Promise<void> {
      this.loading = true;
      const userId = this.$store.state.user.user.id;
      const equipHero1Index = this.currentHero.playerInfo.equipment.findIndex((equip: HeroEquip) => equip.type === this.equipType as HeroEquipType);
      this.currentHero.playerInfo.equipment[equipHero1Index].faction = newFaction;

      try {
        const docRef = this.$fire.firestore.collection(`users/${userId}/heroes`).doc(this.currentHero.id);
        await docRef.update(JSON.parse(JSON.stringify(this.currentHero.playerInfo)));

        this.$store.commit('hero/UPDATE_PLAYER_HERO', { id: userId, hero: this.currentHero });
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Equipment resetted successfully');
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
