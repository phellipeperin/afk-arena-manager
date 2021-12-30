<template>
  <article class="d-flex align-center justify-center equip-image-container">
    <ui-avatar
      :photo-url="loadEquipmentImage(equip.tier, equip.type)"
      rounded
      size="52"
    />
    <ui-avatar
      v-if="hasFaction"
      :photo-url="loadFactionImage(equip.faction)"
      size="18"
      class="equip-image-faction"
    />
    <v-chip
      v-if="equip.tier >= 0"
      x-small
      label
      class="equip-image-tier"
    >
      T{{ equip.tier }}
    </v-chip>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroEquip from '~/application/domain/hero/hero-equip';
import { loadEquipmentTierImage, loadFactionImage } from '~/application/services/imageService';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';

export default Vue.extend({
  props: {
    heroType: { type: String, required: true },
    equip: { type: Object, required: true },
  },
  computed: {
    hasFaction(): boolean {
      return (this.equip as HeroEquip).faction && (this.equip as HeroEquip).faction !== Faction.None;
    },
  },
  methods: {
    loadEquipmentImage(): string {
      return loadEquipmentTierImage((this.equip as HeroEquip).tier, this.heroType as Type, (this.equip as HeroEquip).type);
    },
    loadFactionImage(faction: Faction): string {
      return loadFactionImage(faction);
    },
  },
});
</script>

<style scoped lang="scss">
.equip-image-container {
  position: relative;

  .equip-image-faction {
    position: absolute;
    margin-top: -36px;
    margin-left: -36px;
  }

  .equip-image-tier {
    position: absolute;
    margin-top: 56px;
  }
}
</style>
