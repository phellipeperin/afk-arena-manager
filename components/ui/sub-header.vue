<template>
  <h6 :class="`d-flex align-center text-body-2 sub-header ${noMargin ? 'mb-0' : 'mb-2'}`">
    {{ text }}
  </h6>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: { type: String, required: true },
    noMargin: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">
.sub-header {
  font-size: 0.75rem !important;
  font-weight: bold !important;
  text-transform: uppercase;
  letter-spacing: 1px !important;
}
</style>
