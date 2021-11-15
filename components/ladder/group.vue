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
        :image="loadImage(podium.group)"
        :podium="podium"
      />
    </v-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Group } from '~/application/domain/info/group';
import { loadGroupImage } from '~/application/services/imageService';
import { generateGroupLadder } from '~/application/services/ladder/ladderService';
import User from '~/application/domain/user/user';
import LadderGroupItem from '~/application/domain/ladder/ladderGroupItem';

interface ComponentData {
  items: Array<LadderGroupItem>;
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
    this.items = generateGroupLadder(this.$store.getters['hero/userHeroList'](allUsers));
    this.loading = false;
  },
  methods: {
    loadImage(group: Group): string {
      return loadGroupImage(group);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
