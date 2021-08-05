<template>
  <ui-card
    :elevation="onCompare ? '0' : undefined"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <ui-sub-header text="Total" />
          <v-chip color="primary">
            {{ total }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          :sm="onCompare ? '3' : '2'"
        >
          <ui-sub-header text="Faction" />
          <ladder-item
            v-for="item in faction"
            :key="item.title"
            :image="item.image"
            :title="item.title"
            :value="item.amount"
          />
        </v-col>
        <v-col
          cols="12"
          :sm="onCompare ? '3' : '2'"
        >
          <ui-sub-header text="Class" />
          <ladder-item
            v-for="item in group"
            :key="item.title"
            :image="item.image"
            :title="item.title"
            :value="item.amount"
          />
        </v-col>
        <v-col
          cols="12"
          :sm="onCompare ? '3' : '2'"
        >
          <ui-sub-header text="Type" />
          <ladder-item
            v-for="item in type"
            :key="item.title"
            :image="item.image"
            :title="item.title"
            :value="item.amount"
          />
        </v-col>
        <v-col
          cols="12"
          :sm="onCompare ? '3' : '2'"
        >
          <ui-sub-header text="Role" />
          <ladder-item
            v-for="item in role"
            :key="item.title"
            :image="item.image"
            :title="item.title"
            :value="item.amount"
          />
        </v-col>
      </v-row>
    </v-container>
  </ui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import Ladder from '~/application/domain/ladder/ladder';
import { generateLadder } from '~/application/services/ladder/ladderService';
import { loadFactionImage, loadGroupImage, loadTypeImage, loadRoleImage } from '~/application/services/imageService';
import { loadFactionLabel, loadGroupLabel, loadTypeLabel, loadRoleLabel } from '~/application/services/textService';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Role } from '~/application/domain/info/role';
import { Group } from '~/application/domain/info/group';

interface LadderLayoutItem {
  image: string;
  title: string;
  amount: number;
}

interface ComponentData {
  total: number;
  faction: Array<LadderLayoutItem>;
  group: Array<LadderLayoutItem>;
  type: Array<LadderLayoutItem>;
  role: Array<LadderLayoutItem>;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    showFilter: { type: Boolean, required: false, default: false },
    onCompare: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      total: 0,
      faction: [],
      group: [],
      type: [],
      role: [],
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
          this.$store.dispatch('hero/filterChange', this.$store.state.filter);
          this.formatLadder(generateLadder(this.getPlayerHeroList()));
        }
      },
    },
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
    formatLadder(ladder: Ladder): void {
      this.total = ladder.total;

      this.faction = ladder.faction.map(item => ({ image: loadFactionImage(item.classification as Faction), title: loadFactionLabel(item.classification as Faction), amount: item.amount }));
      this.group = ladder.group.map(item => ({ image: loadGroupImage(item.classification as Group), title: loadGroupLabel(item.classification as Group), amount: item.amount }));
      this.type = ladder.type.map(item => ({ image: loadTypeImage(item.classification as Type), title: loadTypeLabel(item.classification as Type), amount: item.amount }));
      this.role = ladder.role.map(item => ({ image: loadRoleImage(item.classification as Role), title: loadRoleLabel(item.classification as Role), amount: item.amount }));
    },
  },
});
</script>

<style scoped lang="scss">

</style>
