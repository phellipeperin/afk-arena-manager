<template>
  <div>
    <ui-page-header title="Level" />
    <app-ranking-list
      @callbackPlayer="callbackPlayer"
      @callbackDone="callbackDone"
    >
      <section v-if="!loading">
        <div class="d-flex flex-wrap">
          <app-ranking-item
            v-for="(podium, i) in mainLevelPodium"
            :key="`main_level_podium_${i}`"
            :title="podium.title"
            :podium="podium"
          />
        </div>

        <div class="d-flex flex-wrap">
          <app-ranking-item
            v-for="(podium, i) in factionTowerPodium"
            :key="`faction_tower_podium_${i}`"
            :title="podium.title"
            :podium="podium"
          />
        </div>
      </section>
    </app-ranking-list>

    <v-row v-show="loading">
      <v-col
        v-for="n in [1, 2, 3, 4]"
        :key="n"
        cols="12"
        sm="3"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { generateMainStagePodium, generateFactionTowerStagePodium } from '~/application/services/podium/podiumService';
import Podium, { PodiumTemp } from '~/application/domain/ranking/podium';
import User from '~/application/domain/user/user';

interface ComponentData {
  loading: boolean;
  list: Array<PodiumTemp>;
  mainLevelPodium: Array<Podium>;
  factionTowerPodium: Array<Podium>;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      loading: true,
      list: [],
      mainLevelPodium: [],
      factionTowerPodium: [],
    };
  },
  methods: {
    callbackPlayer(player: User) {
      this.list.push({ player });
    },
    callbackDone() {
      this.mainLevelPodium = generateMainStagePodium(this.list);
      this.factionTowerPodium = generateFactionTowerStagePodium(this.list);
      this.loading = false;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
