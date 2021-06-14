<template>
  <div class="text-center text-sm-left">
    <h2 class="text-h2 mb-5">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="text-subtitle-1"
    >
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    description: { type: String, required: false, default: '' },
  },
});
</script>

<style scoped lang="scss">

</style>
