<template>
  <ui-selector-icon
    :label="showLabel ? 'Role' : ''"
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
import { loadRoleImage } from '~/application/services/imageService';
import { loadRoleLabel } from '~/application/services/textService';
import { Role } from '~/application/domain/info/role';

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
      this.createItem(Role.AoE),
      this.createItem(Role.Assassin),
      this.createItem(Role.Buffer),
      this.createItem(Role.BurstDamage),
      this.createItem(Role.ContinuousDamage),
      this.createItem(Role.Control),
      this.createItem(Role.Debuffer),
      this.createItem(Role.Regeneration),
      this.createItem(Role.Tank),
    ];
  },
  methods: {
    createItem(role: Role): IconItem {
      return { id: role, title: loadRoleLabel(role), imageSrc: loadRoleImage(role) };
    },
  },
});
</script>

<style scoped lang="scss">

</style>
