<template>
  <ui-selector-icon
    :label="showLabel ? 'Faction' : ''"
    :value="value"
    :items="items"
    :mandatory="mandatory"
    :multiple="multiple"
    :icon-size="iconSize"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { IconItem } from '~/components/ui/selector/icon.vue';
import { loadFactionImage } from '~/application/services/imageService';
import { loadFactionLabel } from '~/application/services/textService';
import { Faction } from '~/application/domain/info/faction';

interface ComponentData {
  items: Array<IconItem>;
}

export default Vue.extend({
  props: {
    value: { type: [Array, String], required: true },
    mandatory: { type: Boolean, required: false, default: false },
    multiple: { type: Boolean, required: false, default: false },
    showLabel: { type: Boolean, required: false, default: false },
    allowNone: { type: Boolean, required: false, default: false },
    iconSize: { type: String, required: false, default: '32' },
  },
  data(): ComponentData {
    return {
      items: [],
    };
  },
  created() {
    this.items = [
      this.createItem(Faction.Lightbearer),
      this.createItem(Faction.Mauler),
      this.createItem(Faction.Wilder),
      this.createItem(Faction.Graveborn),
      this.createItem(Faction.Celestial),
      this.createItem(Faction.Hypogean),
      this.createItem(Faction.Dimensional),
    ];
    if (this.allowNone) {
      this.items.unshift(this.createItem(Faction.None));
    }
  },
  methods: {
    createItem(faction: Faction): IconItem {
      return { id: faction, title: loadFactionLabel(faction), imageSrc: loadFactionImage(faction) };
    },
  },
});
</script>

<style scoped lang="scss">

</style>
