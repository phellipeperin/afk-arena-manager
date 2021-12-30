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
        :image="loadImage(podium.role)"
        :podium="podium"
      />
    </v-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Role } from '~/application/domain/info/role';
import { loadRoleImage } from '~/application/services/imageService';
import { generateRoleLadder } from '~/application/services/ladder/ladderService';
import User from '~/application/domain/user/user';
import LadderRoleItem from '~/application/domain/ladder/ladderRoleItem';

interface ComponentData {
  items: Array<LadderRoleItem>;
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
    this.items = generateRoleLadder(this.$store.getters['hero/userHeroList'](allUsers));
    this.loading = false;
  },
  methods: {
    loadImage(role: Role): string {
      return loadRoleImage(role);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
