<template>
  <v-row>
    <v-col
      cols="3"
      sm="2"
      lg="1"
      class="d-flex align-center justify-center"
    >
      <img
        width="42"
        :src="image"
        alt="branch"
      >
    </v-col>
    <v-col
      cols="9"
      sm="10"
      lg="11"
      class="d-flex align-center"
    >
      <v-slider
        :value="value"
        :label="`Lv. ${value}`"
        :disabled="disabled"
        hide-details
        thumb-label
        ticks="always"
        color="secondary"
        class="mb-0"
        :thumb-size="24"
        :min="0"
        :max="maxLevel"
        @change="update"
        prepend-icon="mdi-minus-circle-outline"
        append-icon="mdi-plus-circle-outline"
        @click:prepend="decreaseLevel"
        @click:append="addLevel"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: { type: Number, required: true },
    image: { type: String, required: true },
    maxLevel: { type: Number, required: true },
    disabled: { type: Boolean, required: false, default: false },
  },
  methods: {
    decreaseLevel(): void {
      this.update(this.value - 1);
    },
    addLevel(): void {
      this.update(this.value + 1);
    },
    update(newValue: number): void {
      if (newValue < 0 || newValue > this.maxLevel) {
        return;
      }
      this.$emit('input', newValue);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
