<template>
  <div>
    <v-snackbar
      :value="$store.state.feedback.show"
      :color="$store.state.feedback.type"
      multi-line
      bottom
      right
      @input="close"
    >
      {{ $store.state.feedback.message }}

      <template #action>
        <v-btn
          text
          @click="() => close(false)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    close(state: boolean = false) {
      if (!state) {
        this.$store.commit('feedback/HIDE_MESSAGE');
      }
    },
  },
});
</script>
