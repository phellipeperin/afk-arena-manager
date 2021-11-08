<template>
  <v-row class="mt-4">
    <v-col
      cols="12"
      :sm="fullWidth ? 12 : 6"
      :offset-sm="fullWidth ? 0 : 3"
    >
      <ui-card class="text-center py-6">
        <span class="text-h6">{{ text }}</span>
      </ui-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: { type: String, required: false, default: 'No Results' },
    fullWidth: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
