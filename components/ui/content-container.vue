<template>
  <section class="content-container py-4 px-2">
    <v-container
      v-if="loading"
      fluid
    >
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="4"
        >
          <v-skeleton-loader type="card" />
        </v-col>
      </v-row>
    </v-container>

    <div v-if="!loading">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    loading: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">
.content-container {
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
