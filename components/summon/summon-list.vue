<template>
  <article>
    <ui-no-result v-if="!$store.state.summon.list.length" />

    <v-container>
      <v-row>
        <v-col
          v-for="summon in $store.state.summon.list"
          :key="summon.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <summon-list-item :summon="summon" />
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
