<template>
  <v-dialog
    :value="value"
    transition="dialog-bottom-transition"
    :max-width="maxWidth"
    @input="close"
    @click:outside="close"
  >
    <v-card shaped>
      <v-toolbar
        v-if="title"
        dark
        class="dialog-toolbar"
      >
        <h6 class="text-h6">
          {{ title }}
        </h6>
      </v-toolbar>

      <div class="py-2 px-4">
        <slot />
      </div>

      <v-card-actions
        v-if="hasActions"
        class="justify-end"
      >
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
    title: { type: String, required: false, default: '' },
    maxWidth: { type: String, required: false, default: '800' },
  },
  computed: {
    hasActions(): boolean {
      return !!this.$slots.actions;
    },
  },
  methods: {
    close(): void {
      this.$emit('input', false);
    },
  },
});
</script>

<style scoped lang="scss">
@import "~/assets/styles/mixins.scss";

.dialog-toolbar {
  @include gradientBg();
}
</style>
