<template>
  <div class="page-header mb-4">
    <h4 class="text-h4">
      {{ title }}
      <span
        v-if="subtitle && $vuetify.breakpoint.smAndUp"
        class="text-body-2"
      >
        {{ subtitle }}
      </span>
      <v-btn
        v-if="hasExplanation"
        icon
        @click="openDialog"
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </h4>
    <div>
      <slot />
    </div>

    <app-dialog
      :value="isDialogOpen"
      :title="title"
      max-width="500"
      @input="closeDialog"
    >
      <slot name="explanation" />
      <template #actions>
        <v-btn
          text
          @click="closeDialog"
        >
          Close
        </v-btn>
      </template>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  isDialogOpen: boolean;
}

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: false, default: '' },
  },
  data: (): ComponentData => {
    return {
      isDialogOpen: false,
    };
  },
  computed: {
    hasExplanation(): boolean {
      return !!this.$slots.explanation;
    },
  },
  methods: {
    openDialog(): void {
      this.isDialogOpen = true;
    },
    closeDialog(): void {
      this.isDialogOpen = false;
    },
  },
});
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  position: relative;
  text-align: left;
  justify-content: space-between;
}
</style>
