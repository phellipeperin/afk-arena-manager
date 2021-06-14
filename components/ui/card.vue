<template>
  <v-card
    :elevation="elevation"
    :shaped="shaped"
    class="card"
  >
    <slot />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    elevation: { type: String, required: false, default: '2' },
    shaped: { type: Boolean, required: false, default: true },
  },
});
</script>

<style scoped lang="scss">
.card {
  animation: 1s appear;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
