<template>
  <div class="d-flex mb-2 align-baseline">
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <img
          alt="icon"
          :src="image"
          :width="(onCompare || $vuetify.breakpoint.smAndDown) ? 32 : 36"
          v-bind="attrs"
          v-on="on"
        >
      </template>
      <span>{{ title }}</span>
    </v-tooltip>
    <v-chip
      class="text-chip"
      :x-small="onCompare || $vuetify.breakpoint.smAndDown"
      :small="!onCompare && $vuetify.breakpoint.mdAndUp"
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
    onCompare: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">
.text-chip {
  margin-left: -12px;
}
</style>
