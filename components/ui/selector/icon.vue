<template>
  <v-item-group
    :value="value"
    :mandatory="mandatory"
    :multiple="multiple"
    @change="change"
  >
    <div
      v-for="item in items"
      :key="item.id"
    >
      <v-item
        v-slot="{ active, toggle }"
        :value="item.id"
      >
        <v-hover v-slot="{ hover }">
          <img
            alt="icon"
            :src="item.imageSrc"
            width="32"
            :class="`item ${active ? 'item__active' : ''} ${hover ? 'item__hover' : ''}`"
            @click="toggle"
          >
        </v-hover>
      </v-item>
    </div>
  </v-item-group>
</template>

<script lang="ts">
import Vue from 'vue';

export interface IconItem {
  id: string;
  imageSrc: string;
}

interface ComponentData {
  selected: Array<number>
}

export default Vue.extend({
  props: {
    value: { type: [Array, String], required: true },
    items: { type: Array, required: true },
    mandatory: { type: Boolean, required: false, default: false },
    multiple: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      selected: [],
    };
  },
  methods: {
    change(newValue: string[] | string): void {
      this.$emit('input', newValue);
    },
  },
});
</script>

<style scoped lang="scss">
.item {
  opacity: 0.6;
  transition: opacity ease 0.3s;

  &__hover {
    opacity: 1;
    transition: opacity ease 0.3s;
  }

  &__active {
    opacity: 1;
    transition: opacity ease 0.3s;
  }
}
</style>
