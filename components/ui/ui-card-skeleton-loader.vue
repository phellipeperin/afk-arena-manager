<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="i in 3"
        :key="i"
        cols="12"
        md="4"
        class="card"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
});
</script>

<style scoped lang="scss">
.card {
  animation: 1s appear;
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
