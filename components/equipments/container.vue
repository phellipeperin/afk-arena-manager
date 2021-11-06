<template>
  <v-container :key="containerKey">
    <v-row>
      <v-col cols="12">
        <ui-sub-header text="Progress Table" />
        <equipments-progress-table />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <ui-sub-header text="Arrangement" />
        <equipments-arrangement />
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
          const heroList = this.getBasePlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.playerId);
          }
        }
        this.refresh();
      },
    },
  },
  methods: {
    getBasePlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/baseHeroList'](this.playerId);
    },
    refresh(): void {
      // this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
      // TODO
      this.containerKey++;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
