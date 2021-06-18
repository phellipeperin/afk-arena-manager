<template>
  <form>
    <v-row>
      <v-col
        cols="12"
        sm="5"
        md="4"
      >
        <hero-player-form-general-data />
        <hero-player-form-skins />
      </v-col>
      <v-col
        cols="12"
        sm="7"
        md="8"
      >
        <hero-player-form-equipment />
        <hero-player-form-furniture />
      </v-col>
    </v-row>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style scoped lang="scss">

</style>
