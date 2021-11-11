<template>
  <h6 class="text-body-2 sub-header mb-2">
    {{ text }}
  </h6>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: { type: String, required: true },
  },
});
</script>

<style scoped lang="scss">
.sub-header {
  //font-size: 1.1rem !important;

  font-size: 0.75rem !important;
  font-weight: bold !important;
  text-transform: uppercase;
  letter-spacing: 1px !important;
}
</style>
