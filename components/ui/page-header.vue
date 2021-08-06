<template>
  <div class="page-header mb-4">
    <h4 class="text-h4">
      {{ title }}
      <span
        v-if="subtitle && $vuetify.breakpoint.smAndUp"
        class="text-body-2"
      >
        {{ subtitle }}
      </span>
    </h4>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: false, default: '' },
  },
});
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  position: relative;
  text-align: left;
  justify-content: space-between;
}
</style>
