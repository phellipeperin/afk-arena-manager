<template>
  <article>
    <ui-no-result v-if="!$store.state.group.list.length" />

    <v-container>
      <v-row>
        <v-col
          v-for="group in $store.state.group.list"
          :key="group.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <group-list-item :group="group" />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>

<style scoped lang="scss">
</style>
