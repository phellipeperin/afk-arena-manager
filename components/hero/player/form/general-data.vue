<template>
  <div>
    <ui-sub-header text="General Data" />

    <v-slider
      label="No. of Copies"
      thumb-label="always"
      ticks="always"
      :thumb-size="24"
      value="2"
      min="0"
      max="24"
    ></v-slider>

    <v-slider
      label="Signature Item"
      thumb-label="always"
      ticks="always"
      :thumb-size="24"
      value="2"
      min="-1"
      max="30"
      color="secondary"
      track-color="none"
      track-fill-color="secondary"
    ></v-slider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
});
</script>

<style scoped lang="scss">

</style>
