<template>
  <section>
    <ui-page-help-info>
      <h6 class="text-h6">
        Points Calculation
      </h6>
      <p class="text-body-2">
        Please be aware that this values can slightly differ from the ones in-game. That's because the game consider the legendary-tier heroes as well.
      </p>
    </ui-page-help-info>

    <section v-if="!loading">
      <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
        <v-container fluid>
          <ladder-podium-item
            v-for="(podium, index) in ladder.faction"
            :key="`podium-faction-${index}`"
            :image="loadFactionImage(podium.faction)"
            :podium="podium"
          />
        </v-container>
      </ui-content-container>

      <ui-content-container v-show="$store.state.system.pageState.selectedTab === 1">
        <v-container fluid>
          <ladder-podium-item
            v-for="(podium, index) in ladder.group"
            :key="`podium-group-${index}`"
            :image="loadGroupImage(podium.group)"
            :podium="podium"
          />
        </v-container>
      </ui-content-container>

      <ui-content-container v-show="$store.state.system.pageState.selectedTab === 2">
        <v-container fluid>
          <ladder-podium-item
            v-for="(podium, index) in ladder.type"
            :key="`podium-type-${index}`"
            :image="loadTypeImage(podium.type)"
            :podium="podium"
          />
        </v-container>
      </ui-content-container>

      <ui-content-container v-show="$store.state.system.pageState.selectedTab === 3">
        <v-container fluid>
          <ladder-podium-item
            v-for="(podium, index) in ladder.role"
            :key="`podium-role-${index}`"
            :image="loadRoleImage(podium.role)"
            :podium="podium"
          />
        </v-container>
      </ui-content-container>
    </section>

<!--    <v-row v-show="loading">-->
<!--      <v-col-->
<!--        v-for="n in 4"-->
<!--        :key="n"-->
<!--        cols="12"-->
<!--        sm="3"-->
<!--      >-->
<!--        <v-skeleton-loader type="card" />-->
<!--      </v-col>-->
<!--    </v-row>-->
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { generateLadder } from '~/application/services/ladder/ladderService';
import Ladder from '~/application/domain/ladder/ladder';
import User from '~/application/domain/user/user';
import Hero from '~/application/domain/hero/hero';
import { Faction } from '~/application/domain/info/faction';
import { loadFactionImage, loadGroupImage, loadRoleImage, loadTypeImage } from '~/application/services/imageService';
import { Group } from '~/application/domain/info/group';
import { Type } from '~/application/domain/info/type';
import { Role } from '~/application/domain/info/role';

interface ComponentData {
  loading: boolean;
  ladder: Ladder;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      loading: true,
      ladder: new Ladder(),
    };
  },
  async created(): Promise<void> {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Ladders',
      helpInfoEnabled: true,
      tabs: ['Faction', 'Class', 'Type', 'Role'],
    });

    const allUsers: Array<User> = [this.$store.state.user.user, ...this.$store.state.friend.list];
    for (const user of allUsers) {
      const heroList = this.getPlayerBaseHeroList(user.id);
      if (!heroList.length) {
        await this.$store.dispatch('hero/loadHeroesForUser', user.id);
      }
    }
    await this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);

    this.ladder = generateLadder(this.$store.getters['hero/userHeroList'](allUsers));
    this.loading = false;
  },
  methods: {
    getPlayerBaseHeroList(playerId: string): Array<Hero> {
      return this.$store.getters['hero/baseHeroList'](playerId);
    },
    loadFactionImage(faction: Faction): string {
      return loadFactionImage(faction);
    },
    loadGroupImage(group: Group): string {
      return loadGroupImage(group);
    },
    loadTypeImage(type: Type): string {
      return loadTypeImage(type);
    },
    loadRoleImage(role: Role): string {
      return loadRoleImage(role);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
