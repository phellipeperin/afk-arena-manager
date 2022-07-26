<template>
  <div>
    <v-snackbar
      :value="$store.state.feedback.toast.show"
      :color="$store.state.feedback.toast.type"
      multi-line
      shaped
      bottom
      left
      @input="closeToast"
    >
      {{ $store.state.feedback.toast.message }}

      <template #action>
        <v-btn
          text
          @click="() => closeToast(false)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <app-dialog
      :value="$store.state.feedback.confirmation.show"
      :title="$store.state.feedback.confirmation.title"
      max-width="600"
      @input="cancelConfirmation"
    >
      <p>
        {{ $store.state.feedback.confirmation.message }}
      </p>
      <template #actions>
        <v-btn
          :disabled="confirmationRequestActive"
          :loading="confirmationRequestActive"
          text
          @click="cancelConfirmation"
        >
          Cancel
        </v-btn>
        <v-btn
          :disabled="confirmationRequestActive"
          :loading="confirmationRequestActive"
          color="accent"
          @click="confirm"
        >
          Confirm
        </v-btn>
      </template>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  confirmationRequestActive: boolean;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      confirmationRequestActive: false,
    };
  },
  methods: {
    closeToast(state: boolean = false): void {
      if (!state) {
        this.$store.commit('feedback/HIDE_TOAST_MESSAGE');
      }
    },
    cancelConfirmation(): void {
      this.$store.commit('feedback/HIDE_CONFIRMATION_MESSAGE');
    },
    async confirm(): Promise<void> {
      if (this.$store.state.feedback.confirmation.callback) {
        this.confirmationRequestActive = true;
        await this.$store.state.feedback.confirmation.callback();
        setTimeout(() => {
          this.confirmationRequestActive = false;
          this.$store.commit('feedback/HIDE_CONFIRMATION_MESSAGE');
        }, 0);
      }
    },
  },
});
</script>
