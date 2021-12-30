<template>
  <v-chip
    small
    label
    class="mb-1"
    :color="amount ? (amount === total ? 'error' : '') : 'success'"
  >
    <span
      class="font-weight-bold mr-1"
    >
      {{ amount }}
    </span>
    {{ label }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    label: { type: String, required: true },
    amount: { type: Number, required: true },
    total: { type: Number, required: true },
  },
});
</script>

<style scoped lang="scss">
</style>
