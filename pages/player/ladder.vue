<template>
  <div>
    <ui-page-header title="Ladder" />
    <app-ranking-list
      @callbackPlayer="callbackPlayer"
      @callbackDone="callbackDone"
    >
      <app-ranking-item
        title="Total"
      />
    </app-ranking-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { generateLadder } from '~/application/services/ladder/ladderService';
import Hero from '~/application/domain/hero/hero';
import Ladder from '~/application/domain/ladder/ladder';
import { loadFactionImage, loadGroupImage, loadRoleImage, loadTypeImage } from '~/application/services/imageService';
import { Faction } from '~/application/domain/info/faction';
import { loadFactionLabel, loadGroupLabel, loadRoleLabel, loadTypeLabel } from '~/application/services/textService';
import { Group } from '~/application/domain/info/group';
import { Type } from '~/application/domain/info/type';
import { Role } from '~/application/domain/info/role';
import User from '~/application/domain/user/user';

interface LadderPodium {
  playerId: string;
  ladder: Ladder;
}

interface ComponentData {
  players: Array<User>;
  list: Array<LadderPodium>;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      players: [],
      list: [],
    };
  },
  methods: {
    callbackPlayer(player: User, heroList: Array<Hero>) {
      const ladder = generateLadder(heroList);
      this.players.push(player);
      this.list.push({ playerId: player.id, ladder });
    },
    callbackDone() {
      console.log(this.players);
      console.log(this.list);
      // TODO generate podium
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
