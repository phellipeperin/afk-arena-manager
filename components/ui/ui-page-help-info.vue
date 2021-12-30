<template>
  <section>
    <app-dialog
      :value="$store.state.system.pageState.helpDialogOpen"
      :title="$store.state.system.pageState.title"
      max-width="600"
      @input="closeDialog"
    >
      <slot />

      <template #actions>
        <v-btn
          text
          @click="closeDialog"
        >
          Close
        </v-btn>
      </template>
    </app-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    closeDialog(): void {
      this.$store.commit('system/SET_PAGE_STATE_HELP_DIALOG_OPEN', false);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
