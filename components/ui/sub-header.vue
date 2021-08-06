<template>
  <h6 class="text-h6 sub-header">
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
  font-size: 1.1rem !important;
}
</style>
