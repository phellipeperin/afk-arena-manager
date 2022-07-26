<template>
  <v-row>
    <v-col
      v-if="label"
      cols="12"
      sm="1"
      class="pr-0 d-flex align-center"
    >
      <v-label>
        {{ label }}
      </v-label>
    </v-col>
    <v-col
      cols="12"
      sm="4"
      class="d-flex justify-center align-center"
      :class="$vuetify.breakpoint.xsOnly ? 'py-0' : ''"
    >
      <ui-selector-equipment-tier
        :value="`${equip.tier}`"
        :type="type"
        :hero-type="hero.gameInfo.type"
        :icon-size="$vuetify.breakpoint.xsOnly ? '32' : '28'"
        @input="(value) => $emit('updateEquipTier', { type, tier: value })"
      />
    </v-col>
    <v-col
      v-if="showDetails"
      cols="12"
      sm="4"
      class="d-flex justify-center align-center"
    >
      <ui-selector-faction
        :value="equip.faction"
        :icon-size="$vuetify.breakpoint.xsOnly ? '22' : '20'"
        @input="(value) => $emit('updateEquipFaction', { type, faction: value })"
      />
    </v-col>
    <v-col
      v-if="showDetails"
      cols="12"
      sm="3"
      class="d-flex justify-center"
      :class="$vuetify.breakpoint.xsOnly ? 'py-0' : ''"
    >
      <v-rating
        :value="equip.stars"
        background-color="primary"
        color="primary"
        :size="$vuetify.breakpoint.xsOnly ? '24' : '20'"
        clearable
        ripple
        hover
        dense
        @input="(value) => $emit('updateEquipStars', { type, stars: value })"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { loadEquipmentTypeLabel } from '~/application/services/textService';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
    type: { type: String, required: true },
  },
  computed: {
    label(): string {
      return loadEquipmentTypeLabel(this.type as HeroEquipType);
    },
    showDetails(): boolean {
      const { tier } = this.equip;
      return tier !== -1 && tier < 3;
    },
    equip(): HeroEquip {
      return this.hero.playerInfo.equipment.find((elem: HeroEquip) => elem.type === this.type as HeroEquipType)!;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
