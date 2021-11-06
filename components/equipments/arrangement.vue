<template>
  <div>
    test
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationArrangement, required: true },
  },
});
</script>

<style scoped lang="scss">

</style>
