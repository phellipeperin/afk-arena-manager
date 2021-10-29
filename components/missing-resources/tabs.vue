<template>
  <div>
    <v-tabs
      :value="value"
      @change="change"
    >
      <v-tab
        v-for="option in options"
        :key="option.key"
      >
        {{ option.label }}
      </v-tab>
    </v-tabs>

    <div class="pt-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: { type: Number, required: true, default: 0 },
    options: { type: Array, required: true },
  },
  methods: {
    change(newValue: number): void {
      this.$emit('input', newValue);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
