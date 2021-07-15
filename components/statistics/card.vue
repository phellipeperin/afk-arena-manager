<template>
  <ui-card :title="onCompare ? '' : title">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <statistics-chart />
        </v-col>
        <v-col
          cols="12"
          sm="8"
        >
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </ui-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: { type: String, required: false, default: '' },
    onCompare: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
