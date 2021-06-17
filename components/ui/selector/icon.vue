<template>
  <div>
    <p
      v-if="label"
      class="text-body-2 my-1"
    >
      {{ label }}
    </p>
    <v-item-group
      :value="value"
      :mandatory="mandatory"
      :multiple="multiple"
      class="group"
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
              :class="`item mx-1 ${active ? 'item__active' : ''} ${hover ? 'item__hover' : ''}`"
              @click="toggle"
            >
          </v-hover>
        </v-item>
      </div>
    </v-item-group>
  </div>
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
    label: { type: String, required: false, default: '' },
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
.group {
  display: flex;
  position: relative;
  width: 100%;
  //justify-content: center;
}

.item {
  opacity: 0.4;
  transition: opacity ease 0.3s;

  &__hover {
    opacity: 1;
    cursor: pointer;
    transition: opacity ease 0.3s;
  }

  &__active {
    opacity: 1;
    transition: opacity ease 0.3s;
  }
}
</style>
