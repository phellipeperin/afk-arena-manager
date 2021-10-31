<template>
  <v-row class="mt-4">
    <v-col
      cols="12"
      sm="6"
      offset-sm="3"
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
  },
});
</script>

<style scoped lang="scss">

</style>
