<template>
  <div>
    <v-label v-if="label">
      <p class="mb-2">
        {{ label }}
      </p>
    </v-label>

    <div class="d-flex justify-center">
      <ui-selector-equipment-tier
        :value="`${equip.tier}`"
        :type="type"
        @input="(value) => update(() => $store.commit('hero/SET_PLAYER_INFO_EQUIP_TIER', { type, tier: value }))"
      />
    </div>
    <div
      v-if="showDetails"
      class="d-flex justify-center"
    >
      <ui-selector-faction
        :value="equip.faction"
        icon-size="18"
        @input="(value) => update(() => $store.commit('hero/SET_PLAYER_INFO_EQUIP_FACTION', { type, faction: value }))"
      />
    </div>
    <div
      v-if="showDetails"
      class="d-flex justify-center"
    >
      <v-rating
        :value="equip.stars"
        background-color="secondary"
        color="secondary"
        size="20"
        clearable
        ripple
        hover
        dense
        @input="(value) => update(() => $store.commit('hero/SET_PLAYER_INFO_EQUIP_STARS', { type, stars: value }))"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { loadEquipmentTypeLabel } from '~/application/services/textService';

export default Vue.extend({
  props: {
    type: { type: String, required: true },
  },
  computed: {
    label(): string {
      return loadEquipmentTypeLabel(this.type as HeroEquipType);
    },
    showDetails(): boolean {
      const { tier } = this.equip;
      return tier !== -1 && tier !== 3;
    },
    equip(): HeroEquip {
      return this.$store.state.hero.hero.playerInfo.equipment.find((elem: HeroEquip) => elem.type === this.type as HeroEquipType);
    },
  },
  methods: {
    update(action: Function): void {
      action();
      this.$forceUpdate();
    },
  },
});
</script>

<style scoped lang="scss">

</style>
