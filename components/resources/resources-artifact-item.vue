<template>
  <div class="artifact-container">
    <img
      :src="image"
      :class="`${small ? 'small' : ''}`"
      alt="artifact"
    >
    <div class="rating">
      <v-rating
        :value="stars"
        :readonly="disabled"
        background-color="secondary"
        color="secondary"
        :size="small ? 14 : 18"
        clearable
        ripple
        hover
        dense
        @input="(value) => update(value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    image: { type: String, required: true },
    stars: { type: Number, required: true },
    small: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
  },
  methods: {
    update(stars: number): void {
      this.$emit('update', stars);
    },
  },
});
</script>

<style scoped lang="scss">
.artifact-container {
  margin: 0 8px 12px;
  text-align: center;

  img {
    width: 68px;
    height: 68px;
    border-radius: 6px;

    &.small {
      width: 52px;
      height: 52px;
    }
  }

  .rating {
    margin-top: -8px;
  }
}
</style>
