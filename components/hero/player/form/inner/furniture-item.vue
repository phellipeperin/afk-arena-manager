<template>
  <div class="pb-2">
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
    >
      <template #thumb-label="props">
        {{ props.value === -1 ? 'NA' : `+${props.value}` }}
      </template>
    </v-slider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getFurnitureColor } from '~/application/services/heroService';

export default Vue.extend({
  props: {
    plus: { type: Number, required: true },
  },
  computed: {
    color(): string {
      return getFurnitureColor(this.plus);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
