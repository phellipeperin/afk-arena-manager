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
        :image="loadImage(podium.type)"
        :podium="podium"
      />
    </v-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Type } from '~/application/domain/info/type';
import { loadTypeImage } from '~/application/services/imageService';
import { generateTypeLadder } from '~/application/services/ladder/ladderService';
import User from '~/application/domain/user/user';
import LadderTypeItem from '~/application/domain/ladder/ladderTypeItem';

interface ComponentData {
  items: Array<LadderTypeItem>;
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
    this.items = generateTypeLadder(this.$store.getters['hero/userHeroList'](allUsers));
    this.loading = false;
  },
  methods: {
    loadImage(type: Type): string {
      return loadTypeImage(type);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
