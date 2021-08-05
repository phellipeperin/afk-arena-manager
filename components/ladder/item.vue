<template>
  <div class="d-flex mb-2 align-baseline">
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <img
          alt="icon"
          :src="image"
          width="36"
          v-bind="attrs"
          v-on="on"
        >
      </template>
      <span>{{ title }}</span>
    </v-tooltip>
    <v-chip
      class="text-chip"
      small
    >
      {{ value }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    image: { type: String, required: true },
    title: { type: String, required: false, default: '' },
    value: { type: Number, required: true },
  },
});
</script>

<style scoped lang="scss">
.text-chip {
  margin-left: -12px;
}
</style>
