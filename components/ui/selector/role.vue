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
import { IconItem } from '~/components/ui/selector/icon.vue';
import { loadRoleImage } from '~/application/services/imageService';
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
  created() {
    this.items = [
      { id: Role.AoE, imageSrc: loadRoleImage(Role.AoE) },
      { id: Role.Assassin, imageSrc: loadRoleImage(Role.Assassin) },
      { id: Role.Buffer, imageSrc: loadRoleImage(Role.Buffer) },
      { id: Role.BurstDamage, imageSrc: loadRoleImage(Role.BurstDamage) },
      { id: Role.ContinuousDamage, imageSrc: loadRoleImage(Role.ContinuousDamage) },
      { id: Role.Control, imageSrc: loadRoleImage(Role.Control) },
      { id: Role.Debuffer, imageSrc: loadRoleImage(Role.Debuffer) },
      { id: Role.Regeneration, imageSrc: loadRoleImage(Role.Regeneration) },
      { id: Role.Tank, imageSrc: loadRoleImage(Role.Tank) },
    ];
  },
});
</script>

<style scoped lang="scss">

</style>
