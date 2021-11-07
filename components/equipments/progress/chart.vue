<template>
  <div>
    <statistics-chart-stacked-column :data="[]" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationProgressItem from '~/application/domain/equipment/equipmentInformationProgressItem';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgressItem, required: true },
  },
});
</script>

<style scoped lang="scss">
.faction-image {
  width: 32px;
  height: 32px;
}
</style>
