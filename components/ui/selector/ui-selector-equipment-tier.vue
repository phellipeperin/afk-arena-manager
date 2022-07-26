<template>
  <ui-selector-icon
    :value="value"
    :items="items"
    :icon-size="iconSize"
    active-elevation="4"
    mandatory
    v-on="$listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { IconItem } from '~/components/ui/selector/ui-selector-icon.vue';
import { loadEquipmentTierImage } from '~/application/services/imageService';
import { loadEquipmentTierLabel } from '~/application/services/textService';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { Type } from '~/application/domain/info/type';

interface ComponentData {
  items: Array<IconItem>;
}

export default Vue.extend({
  props: {
    value: { type: [Array, String], required: true },
    type: { type: String, required: true },
    heroType: { type: String, required: true },
    iconSize: { type: String, required: false, default: '24' },
  },
  data(): ComponentData {
    return {
      items: [],
    };
  },
  created(): void {
    this.items = [
      this.createItem(-1),
      this.createItem(0),
      this.createItem(1),
      this.createItem(2),
      this.createItem(3),
      this.createItem(4),
    ];
  },
  methods: {
    createItem(tier: number): IconItem {
      return { id: `${tier}`, title: loadEquipmentTierLabel(tier), imageSrc: loadEquipmentTierImage(tier, this.heroType as Type, this.type as HeroEquipType) };
    },
  },
});
</script>

<style scoped lang="scss">

</style>
