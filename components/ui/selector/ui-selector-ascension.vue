<template>
  <div>
    <ui-selector-icon
      :label="showLabel ? 'Ascension' : ''"
      :value="value"
      :items="singleLine ? [...items, ...ascendedItems] : items"
      :multiple="multiple"
      :default-value="defaultValue"
      v-on="$listeners"
    />
    <ui-selector-icon
      v-if="!singleLine"
      :value="value"
      :items="ascendedItems"
      :multiple="multiple"
      :default-value="defaultValue"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IconItem } from '~/components/ui/selector/ui-selector-icon.vue';
import { loadAscensionImage } from '~/application/services/imageService';
import { loadAscensionLabel } from '~/application/services/textService';
import { Ascension } from '~/application/domain/info/ascension';

interface ComponentData {
  items: Array<IconItem>;
  ascendedItems: Array<IconItem>;
}

export default Vue.extend({
  props: {
    value: { type: [Array, String], required: true },
    multiple: { type: Boolean, required: false, default: false },
    showLabel: { type: Boolean, required: false, default: false },
    showNone: { type: Boolean, required: false, default: false },
    singleLine: { type: Boolean, required: false, default: false },
    awakenedHero: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      items: [],
      ascendedItems: [],
    };
  },
  computed: {
    defaultValue(): Ascension {
      return Ascension.None;
    },
  },
  created(): void {
    this.items = [
      this.createItem(Ascension.Legendary),
      this.createItem(Ascension.LegendaryPlus),
      this.createItem(Ascension.Mythic),
      this.createItem(Ascension.MythicPlus),
    ];
    if (!this.awakenedHero) {
      this.items.unshift(this.createItem(Ascension.ElitePlus));
      this.items.unshift(this.createItem(Ascension.Elite));
    }
    if (this.showNone) {
      this.items.unshift(this.createItem(Ascension.None));
    }
    this.ascendedItems = [
      this.createItem(Ascension.Ascended),
      this.createItem(Ascension.Ascended1Star),
      this.createItem(Ascension.Ascended2Star),
      this.createItem(Ascension.Ascended3Star),
      this.createItem(Ascension.Ascended4Star),
      this.createItem(Ascension.Ascended5Star),
    ];
  },
  methods: {
    createItem(ascension: Ascension): IconItem {
      return { id: ascension, title: loadAscensionLabel(ascension), imageSrc: loadAscensionImage(ascension) };
    },
  },
});
</script>

<style scoped lang="scss">
</style>
