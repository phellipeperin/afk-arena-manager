<template>
  <div>
    <ui-page-header title="Ladder" />
    <app-ranking-list
      @callbackPlayer="callbackPlayer"
      @callbackDone="callbackDone"
    >
      <section v-if="!loading">
        <ui-sub-header text="Faction" />
        <div class="d-flex flex-wrap">
          <app-ranking-item
            v-for="(podium, i) in factionPodium"
            :key="`faction_podium_${i}`"
            :title="podium.title"
            :podium="podium"
          />
        </div>

        <ui-sub-header text="Class" />
        <div class="d-flex flex-wrap">
          <app-ranking-item
            v-for="(podium, i) in groupPodium"
            :key="`class_podium_${i}`"
            :title="podium.title"
            :podium="podium"
          />
        </div>

        <ui-sub-header text="Type" />
        <div class="d-flex flex-wrap">
          <app-ranking-item
            v-for="(podium, i) in typePodium"
            :key="`type_podium_${i}`"
            :title="podium.title"
            :podium="podium"
          />
        </div>

        <ui-sub-header text="Role" />
        <div class="d-flex flex-wrap">
          <app-ranking-item
            v-for="(podium, i) in rolePodium"
            :key="`role_podium_${i}`"
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
import { generateLadder } from '~/application/services/ladder/ladderService';
import {
  generateLadderFactionPodiumList,
  generateLadderTypePodiumList,
  generateLadderGroupPodiumList,
  generateLadderRolePodiumList,
} from '~/application/services/podium/podiumService';
import Hero from '~/application/domain/hero/hero';
import Podium, { PodiumTemp } from '~/application/domain/ranking/podium';
import User from '~/application/domain/user/user';

interface ComponentData {
  loading: boolean;
  list: Array<PodiumTemp>;
  factionPodium: Array<Podium>;
  typePodium: Array<Podium>;
  groupPodium: Array<Podium>;
  rolePodium: Array<Podium>;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      loading: true,
      list: [],
      factionPodium: [],
      typePodium: [],
      groupPodium: [],
      rolePodium: [],
    };
  },
  methods: {
    callbackPlayer(player: User, heroList: Array<Hero>) {
      this.list.push({ player, ladder: generateLadder(heroList) });
    },
    callbackDone() {
      this.factionPodium = generateLadderFactionPodiumList(this.list);
      this.typePodium = generateLadderTypePodiumList(this.list);
      this.groupPodium = generateLadderGroupPodiumList(this.list);
      this.rolePodium = generateLadderRolePodiumList(this.list);
      this.loading = false;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
