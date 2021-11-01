<template>
  <v-container>
    <v-row
      :key="containerKey"
      no-gutters
    >
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
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  containerKey: number;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      containerKey: 1,
    };
  },
  watch: {
    playerId: {
      immediate: true,
      async handler(): Promise<void> {
        if (this.playerId) {
          const heroList = this.getPlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.playerId);
          }
        }
        // this.containerKey++;
      },
    },
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
