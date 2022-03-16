<template>
  <ui-selector-icon
    :value="value"
    :items="items"
    icon-size="24"
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

interface ComponentData {
  items: Array<IconItem>;
}

export default Vue.extend({
  props: {
    value: { type: [Array, String], required: true },
    type: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      items: [],
    };
  },
  created() {
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
      return { id: `${tier}`, title: loadEquipmentTierLabel(tier), imageSrc: loadEquipmentTierImage(tier, this.$store.state.hero.hero.gameInfo.type, this.type as HeroEquipType) };
    },
  },
});
</script>

<style scoped lang="scss">

</style>
