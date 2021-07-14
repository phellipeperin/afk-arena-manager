<template>
  <v-card
    :elevation="elevation"
    :shaped="shaped"
    class="card"
  >
    <v-toolbar
      v-if="title"
      dark
      dense
      class="app-toolbar"
    >
      <div class="d-flex justify-space-between toolbar-container">
        <ui-sub-header :text="title" />

        <div class="pr-2">
          <slot name="toolbar-info" />
        </div>
      </div>
    </v-toolbar>

    <slot />

    <v-card-actions
      v-if="hasActions"
      class="justify-end px-4"
    >
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: { type: String, required: false, default: '' },
    elevation: { type: String, required: false, default: '2' },
    shaped: { type: Boolean, required: false, default: true },
  },
  computed: {
    hasActions(): boolean {
      return !!this.$slots.actions;
    },
  },
});
</script>

<style scoped lang="scss">
.card {
  animation: 1s appear;
}

.toolbar-container {
  width: 100%;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
