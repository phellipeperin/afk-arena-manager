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
import { IconItem } from '~/components/ui/selector/icon';
import { loadGroupImage } from '~/application/services/imageService';
import { Group } from '~/application/domain/info/group';

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
      { id: Group.Support, imageSrc: loadGroupImage(Group.Support) },
      { id: Group.Mage, imageSrc: loadGroupImage(Group.Mage) },
      { id: Group.Warrior, imageSrc: loadGroupImage(Group.Warrior) },
      { id: Group.Tank, imageSrc: loadGroupImage(Group.Tank) },
      { id: Group.Ranger, imageSrc: loadGroupImage(Group.Ranger) },
    ];
  },
});
</script>

<style scoped lang="scss">

</style>
