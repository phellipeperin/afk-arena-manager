<template>
  <div>
    <ui-page-header title="Ladder" />
    <app-ranking-list
      @callbackPlayer="callbackPlayer"
      @callbackDone="callbackDone"
    >
      <section v-if="!loading">
        <ui-sub-header text="Faction" />
        <app-ranking-item
          v-for="(podium, i) in factionPodium"
          :key="`faction_podium_${i}`"
          title="Total"
          :podium="podium"
        />
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
import Podium, { LadderPodiumTemp } from '~/application/domain/podium/podium';
import User from '~/application/domain/user/user';

interface ComponentData {
  loading: boolean;
  list: Array<LadderPodiumTemp>;
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
    // formatLadder(ladder: Ladder): void {
    //   this.total = ladder.total;
    //
    //   this.faction = ladder.faction.map(item => ({ image: loadFactionImage(item.classification as Faction), title: loadFactionLabel(item.classification as Faction), amount: item.amount }));
    //   this.group = ladder.group.map(item => ({ image: loadGroupImage(item.classification as Group), title: loadGroupLabel(item.classification as Group), amount: item.amount }));
    //   this.type = ladder.type.map(item => ({ image: loadTypeImage(item.classification as Type), title: loadTypeLabel(item.classification as Type), amount: item.amount }));
    //   this.role = ladder.role.map(item => ({ image: loadRoleImage(item.classification as Role), title: loadRoleLabel(item.classification as Role), amount: item.amount }));
    // },
  },
});
</script>

<style scoped lang="scss">

</style>
