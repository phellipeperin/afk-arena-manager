<template>
  <ui-selector-icon
    :label="showLabel ? 'Faction' : ''"
    :value="value"
    :items="items"
    :mandatory="mandatory"
    :multiple="multiple"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { IconItem } from '~/components/ui/selector/icon';
import { loadFactionImage } from '~/application/services/imageService';
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
  },
  data(): ComponentData {
    return {
      items: [],
    };
  },
  created() {
    this.items = [
      { id: Faction.Lightbearer, imageSrc: loadFactionImage(Faction.Lightbearer) },
      { id: Faction.Mauler, imageSrc: loadFactionImage(Faction.Mauler) },
      { id: Faction.Wilder, imageSrc: loadFactionImage(Faction.Wilder) },
      { id: Faction.Graveborn, imageSrc: loadFactionImage(Faction.Graveborn) },
      { id: Faction.Celestial, imageSrc: loadFactionImage(Faction.Celestial) },
      { id: Faction.Hypogean, imageSrc: loadFactionImage(Faction.Hypogean) },
      { id: Faction.Dimensional, imageSrc: loadFactionImage(Faction.Dimensional) },
    ];
    if (this.allowNone) {
      this.items.unshift({ id: Faction.None, imageSrc: loadFactionImage(Faction.None) });
    }
  },
});
</script>

<style scoped lang="scss">

</style>
