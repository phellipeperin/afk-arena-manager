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
        :image="loadImage(podium.division)"
        :podium="podium"
      />
    </v-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Division } from '~/application/domain/info/division';
import { loadDivisionImage } from '~/application/services/imageService';
import { generateDivisionLadder } from '~/application/services/ladder/ladderService';
import User from '~/application/domain/user/user';
import LadderDivisionItem from '~/application/domain/ladder/ladderDivisionItem';

interface ComponentData {
  items: Array<LadderDivisionItem>;
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
    this.items = generateDivisionLadder(this.$store.getters['hero/userHeroList'](allUsers));
    this.loading = false;
  },
  methods: {
    loadImage(division: Division): string {
      return loadDivisionImage(division);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
