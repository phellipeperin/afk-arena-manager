<template>
  <ui-selector-icon
    :label="showLabel ? 'Type' : ''"
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
import { loadTypeImage } from '~/application/services/imageService';
import { loadTypeLabel } from '~/application/services/textService';
import { Type } from '~/application/domain/info/type';

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
  created() {
    this.items = [
      this.createItem(Type.STR),
      this.createItem(Type.INT),
      this.createItem(Type.DEX),
    ];
  },
  methods: {
    createItem(type: Type): IconItem {
      return { id: type, title: loadTypeLabel(type), imageSrc: loadTypeImage(type) };
    },
  },
});
</script>

<style scoped lang="scss">

</style>
