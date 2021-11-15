<template>
  <div>
    <ui-no-result text="Coming Soon..." />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';
import { generateEquipmentInformationArrangement } from '~/application/services/equipment/equipmentArrangementService';

interface ComponentData {
  information: EquipmentInformationArrangement;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      information: new EquipmentInformationArrangement(),
    };
  },
  created(): void {
    this.information = generateEquipmentInformationArrangement(this.$store.getters['hero/baseHeroList'](this.playerId));
  },
});
</script>

<style scoped lang="scss">

</style>
