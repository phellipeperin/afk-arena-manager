<template>
  <div>
    <v-slider
      hide-details
      thumb-label="always"
      ticks="always"
      :thumb-size="18"
      min="-1"
      max="3"
      :color="color"
      track-color="none"
      :track-fill-color="color"
      :value="plus"
      @input="(value) => $emit('update:plus', value)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    plus: { type: Number, required: true },
  },
  computed: {
    color(): string {
      return this.plus === -1 ? 'none' : 'mythic';
    },
  },
});
</script>

<style scoped lang="scss">

</style>
