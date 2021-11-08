<template>
  <div :class="`image-container ${small ? 'small' : ''}`">
    <img
      :src="imageSrc"
      alt="resource"
    >
    <v-chip
      small
      label
      class="amount-needed"
      :color="amount ? '' : 'success'"
    >
      {{ formatNumber(amount) }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    imageSrc: { type: String, required: true },
    amount: { type: Number, required: false, default: 0 },
    small: { type: Boolean, required: false, default: false },
  },
  methods: {
    formatNumber(value: number): string {
      if (value >= 10000000) {
        return `${this.addNumberSeparators(Math.round(value / 1000000))} M`;
      }
      if (value >= 1000000) {
        return `${this.addNumberSeparators(Math.round(value / 1000))} K`;
      }
      return this.addNumberSeparators(value);
    },
    addNumberSeparators(value: number): string {
      return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
    },
  },
});
</script>

<style scoped lang="scss">
.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  margin-bottom: 20px;

  img {
    width: 68px;
    height: 68px;
    border-radius: 6px;
  }

  .amount-needed {
    position: absolute;
    font-weight: 600;
    padding: 2px 8px;
    font-size: 12px;
    bottom: -12px;
  }

  &.small {
    img {
      width: 48px;
      height: 48px;
    }

    .amount-needed {
      padding: 1px 6px;
      font-size: 11px;
    }
  }
}
</style>
