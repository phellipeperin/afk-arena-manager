<template>
  <app-dialog
    :value="value"
    title="Swap Equipments"
    max-width="600"
    @input="close"
  >
    <v-container
      v-if="value"
      fluid
    >
      <v-row>
        <v-col
          cols="5"
          class="d-flex align-center justify-center"
        >
          <ui-avatar
            rounded
            size="82"
            :photo-url="hero1Image"
          />
        </v-col>
        <v-col cols="2" />
        <v-col
          cols="5"
          class="d-flex align-center justify-center"
        >
          <ui-avatar
            rounded
            size="82"
            :photo-url="hero2Image"
          />
        </v-col>
      </v-row>
      <equipments-swap-row
        :equip-type="weaponType"
        :hero1="hero1"
        :hero2="hero2"
      />
      <equipments-swap-row
        :equip-type="headType"
        :hero1="hero1"
        :hero2="hero2"
      />
      <equipments-swap-row
        :equip-type="chestType"
        :hero1="hero1"
        :hero2="hero2"
      />
      <equipments-swap-row
        :equip-type="feetType"
        :hero1="hero1"
        :hero2="hero2"
      />
    </v-container>

    <template #actions>
      <v-btn
        text
        @click="close"
      >
        Close
      </v-btn>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { loadHeroImage } from '~/application/services/hero/heroService';

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
    hero1: { type: Hero, required: true },
    hero2: { type: Hero, required: true },
  },
  computed: {
    weaponType(): HeroEquipType { return HeroEquipType.Weapon; },
    headType(): HeroEquipType { return HeroEquipType.Head; },
    chestType(): HeroEquipType { return HeroEquipType.Chest; },
    feetType(): HeroEquipType { return HeroEquipType.Feet; },
    hero1Image(): string {
      return loadHeroImage(this.hero1);
    },
    hero2Image(): string {
      return loadHeroImage(this.hero2);
    },
  },
  methods: {
    close(): void {
      this.$emit('input', false);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
