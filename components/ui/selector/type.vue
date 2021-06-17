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
import { IconItem } from '~/components/ui/selector/icon';
import { loadTypeImage } from '~/application/services/imageService';
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
      { id: Type.STR, imageSrc: loadTypeImage(Type.STR) },
      { id: Type.INT, imageSrc: loadTypeImage(Type.INT) },
      { id: Type.DEX, imageSrc: loadTypeImage(Type.DEX) },
    ];
  },
});
</script>

<style scoped lang="scss">

</style>
