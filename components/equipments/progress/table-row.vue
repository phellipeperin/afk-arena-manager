<template>
  <tr>
    <td class="text-center">
      <img
        :src="factionImage"
        alt="faction"
        class="faction-image"
      >
    </td>
    <td>
      str chart
    </td>
    <td>
      dex chart
    </td>
    <td>
      int chart
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadFactionImage } from '~/application/services/imageService';
import { Faction } from '~/application/domain/info/faction';

export default Vue.extend({
  props: {
    faction: { type: Faction, required: true },
  },
  computed: {
    factionImage(): string { return loadFactionImage(this.faction); },
  },
});
</script>

<style scoped lang="scss">
.faction-image {
  width: 32px;
  height: 32px;
}
</style>
