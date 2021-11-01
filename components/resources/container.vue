<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <resources-elder-tree
          :player-id="playerId"
          :on-compare="onCompare"
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
  // watch: {
  //   playerId: {
  //     immediate: true,
  //     async handler(): Promise<void> {
  //       if (this.playerId) {
  //         const heroList = this.getPlayerHeroList();
  //         if (!heroList.length) {
  //           await this.$store.dispatch('hero/loadHeroesForUser', this.playerId);
  //         }
  //       }
  //       this.refresh();
  //     },
  //   },
  // },
  // methods: {
  //   getPlayerHeroList(): Array<Hero> {
  //     return this.$store.getters['hero/heroList'](this.playerId);
  //   },
  //   refresh(): void {
  //     this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
  //     this.statistics = generateStatistics(this.getPlayerHeroList());
  //     this.containerKey++;
  //   },
  // },
});
</script>

<style scoped lang="scss">

</style>
