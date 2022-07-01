<template>
  <article>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          class="d-flex align-center"
        >
          <h6 class="text-h6">
            Ob
          </h6>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

// interface ComponentData {
//   requestActive: boolean;
//   elderTree: ResourceElderTree;
//   elderTreeMain: ResourceElderTreeMain;
// }

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    guildId: { type: String, required: false, default: '' },
  },
  // data(): ComponentData {
  //   return {
  //     requestActive: false,
  //     elderTree: new ResourceElderTree(),
  //     elderTreeMain: { level: 0, droplets: 0 },
  //   };
  // },
  created(): void {
    // const heroes = this.$store.getters['hero/baseHeroList'](this.playerId);
    if (this.guildId) {
      // load objective based on guild
    } else {
      // personal objective
    }
  },
});
</script>

<style scoped lang="scss">

</style>
