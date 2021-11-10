<template>
  <div>
<!--      <template #explanation>-->
<!--        <h6 class="text-h6">-->
<!--          Progress Table-->
<!--        </h6>-->
<!--        <p class="text-body-2">-->
<!--          The progress table does NOT consider equipments with wrong and no faction. To re-arrange the equipments in a better position, use the arrangement section.-->
<!--        </p>-->
<!--      </template>-->

    <equipments-container
      show-filter
      :player-id="$store.state.user.user.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

Vue.use(VueApexCharts);
Vue.component('Apexchart', VueApexCharts);

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Equipments',
    });
  },
});
</script>

<style scoped lang="scss">

</style>
