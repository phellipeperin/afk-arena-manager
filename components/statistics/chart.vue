<template>
  <div>
    <apexchart
      width="500"
      type="donut"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      options: {},
      series: [44, 55, 41, 17, 15]
    };
  },
});
</script>

<style scoped lang="scss">

</style>
