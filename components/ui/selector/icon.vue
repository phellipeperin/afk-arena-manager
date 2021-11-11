<template>
  <div>
    <v-label
      v-if="label"
      class="text-subtitle-1 d-inline-block mt-1"
    >
      {{ label }}
    </v-label>
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
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-hover v-slot="{ hover }">
                <img
                  alt="icon"
                  :src="item.imageSrc"
                  :width="iconSize"
                  :class="`item rounded mx-1 ${active ? `item__active elevation-${activeElevation}` : ''} ${hover ? 'item__hover' : ''}`"
                  v-bind="attrs"
                  v-on="on"
                  @click="toggle"
                >
              </v-hover>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-item>
      </div>
    </v-item-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export interface IconItem {
  id: string;
  title: string;
  imageSrc: string;
}

interface ComponentData {
  selected: Array<number>
}

export default Vue.extend({
  props: {
    value: { type: [Array, String], required: true },
    defaultValue: { type: [Array, String], required: false, default: '' },
    items: { type: Array, required: true },
    label: { type: String, required: false, default: '' },
    iconSize: { type: String, required: false, default: '32px' },
    activeElevation: { type: String, required: false, default: '0' },
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
      this.$emit('input', newValue || this.defaultValue);
    },
  },
});
</script>

<style scoped lang="scss">
.group {
  display: flex;
  position: relative;
  width: 100%;
}

.item {
  opacity: 0.2;
  transition: all ease 0.3s;

  &__hover {
    opacity: 0.85;
    cursor: pointer;
    transition: all ease 0.3s;
  }

  &__active {
    opacity: 1;
    transition: all ease 0.3s;
  }
}
</style>
