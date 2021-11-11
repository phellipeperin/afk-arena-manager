<template>
  <v-row>
    <v-col cols="3">
      <v-avatar
        rounded
        :color="value ? 'transparent' : 'primary'"
        size="100%"
      >
        <img
          v-if="value"
          :src="value"
          :alt="fallbackText"
        >
        <span
          v-else
          class="white--text"
        >
          {{ fallbackText || label.substring(0, 1).toUpperCase() }}
        </span>
      </v-avatar>
    </v-col>
    <v-col cols="9">
      <v-text-field
        :value="value"
        :label="label"
        :rules="rules"
        color="secondary"
        @input="formatAndEmitValue"
        @update:error="(state) => { $emit('update:error', state); }"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    fallbackText: { type: String, required: false, default: '' },
    rules: { type: Array, required: false, default: () => [] },
  },
  methods: {
    formatAndEmitValue(newValue: string): void {
      const index = newValue.indexOf('/revision');
      this.$emit('input', index === -1 ? newValue : newValue.substring(0, index));
    },
  },
});
</script>

<style scoped lang="scss">

</style>
