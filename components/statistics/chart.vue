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
  props: {
    series: { type: Array, required: true },
  },
  data() {
    return {
      options: {},
    };
  },
});
</script>

<style scoped lang="scss">

</style>
