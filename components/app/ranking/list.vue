<template>
  <section>
    <slot />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import User from '~/application/domain/user/user';

export default Vue.extend({
  async created(): Promise<void> {
    await this.generateUserData(this.$store.state.user.user);
    for (const friend of this.$store.state.friend.list) {
      await this.generateUserData(friend);
    }
    this.$emit('callbackDone');
  },
  methods: {
    async generateUserData(user: User): Promise<void> {
      const playerId = user.id;
      const heroList = this.getPlayerHeroList(playerId);
      if (!heroList.length) {
        await this.$store.dispatch('hero/loadHeroesForUser', playerId);
      }
      await this.$store.dispatch('hero/filterChange', this.$store.state.filter);
      this.$emit('callbackPlayer', user, this.getPlayerHeroList(playerId));
    },
    getPlayerHeroList(playerId: string): Array<Hero> {
      return this.$store.getters['hero/baseHeroList'](playerId);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
