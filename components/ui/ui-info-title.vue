<template>
  <div>
    <p class="text-overline mb-0">
      {{ text }}
    </p>
    <p class="text-body-1">
      <slot />
    </p>
  </div>
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
