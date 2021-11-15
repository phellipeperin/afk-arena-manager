<template>
  <section>
    <ui-card-skeleton-loader v-if="loading" />
    <v-container
      v-else
      fluid
    >
      <ladder-podium-item
        v-for="(podium, index) in items"
        :key="`podium-${index}`"
        :has-divider="!!index"
        :image="loadImage(podium.faction)"
        :podium="podium"
      />
    </v-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Faction } from '~/application/domain/info/faction';
import { loadFactionImage } from '~/application/services/imageService';
import LadderFactionItem from '~/application/domain/ladder/ladderFactionItem';
import { generateFactionLadder } from '~/application/services/ladder/ladderService';
import User from '~/application/domain/user/user';

interface ComponentData {
  items: Array<LadderFactionItem>;
  loading: boolean;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      items: [],
      loading: true,
    };
  },
  created(): void {
    const allUsers: Array<User> = [this.$store.state.user.user, ...this.$store.state.friend.list];
    this.items = generateFactionLadder(this.$store.getters['hero/userHeroList'](allUsers));
    this.loading = false;
  },
  methods: {
    loadImage(faction: Faction): string {
      return loadFactionImage(faction);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
