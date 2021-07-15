<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          title="Ascension"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          title="Signature Item"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          title="Furniture"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          title="Equipment"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
