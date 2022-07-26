<template>
  <ui-selector-icon
    :label="showLabel ? 'Class' : ''"
    :value="value"
    :items="items"
    :mandatory="mandatory"
    :multiple="multiple"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { IconItem } from '~/components/ui/selector/ui-selector-icon.vue';
import { loadDivisionImage } from '~/application/services/imageService';
import { loadDivisionLabel } from '~/application/services/textService';
import { Division } from '~/application/domain/info/division';

interface ComponentData {
  items: Array<IconItem>;
}

export default Vue.extend({
  props: {
    value: { type: [Array, String], required: true },
    mandatory: { type: Boolean, required: false, default: false },
    multiple: { type: Boolean, required: false, default: false },
    showLabel: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      items: [],
    };
  },
  created(): void {
    this.items = [
      this.createItem(Division.Support),
      this.createItem(Division.Mage),
      this.createItem(Division.Warrior),
      this.createItem(Division.Tank),
      this.createItem(Division.Ranger),
    ];
  },
  methods: {
    createItem(division: Division): IconItem {
      return { id: division, title: loadDivisionLabel(division), imageSrc: loadDivisionImage(division) };
    },
  },
});
</script>

<style scoped lang="scss">

</style>
