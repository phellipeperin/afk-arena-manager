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
import { IconItem } from '~/components/ui/selector/icon.vue';
import { loadGroupImage } from '~/application/services/imageService';
import { loadGroupLabel } from '~/application/services/textService';
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
      this.createItem(Group.Support),
      this.createItem(Group.Mage),
      this.createItem(Group.Warrior),
      this.createItem(Group.Tank),
      this.createItem(Group.Ranger),
    ];
  },
  methods: {
    createItem(group: Group): IconItem {
      return { id: group, title: loadGroupLabel(group), imageSrc: loadGroupImage(group) };
    },
  },
});
</script>

<style scoped lang="scss">

</style>
