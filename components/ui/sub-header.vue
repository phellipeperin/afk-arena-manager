<template>
  <h6 class="text-h6">
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

</style>
