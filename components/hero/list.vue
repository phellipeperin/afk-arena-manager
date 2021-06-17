<template>
  <div class="d-flex">
    <div
      v-if="adminView"
      class="d-flex flex-wrap justify-space-around"
    >
      <hero-list-admin-item
        v-for="hero in $store.state.hero.list"
        :key="hero.id"
        :hero="hero"
        @select="() => select(hero)"
      />
    </div>
    <div
      v-else
      class="d-flex flex-wrap justify-space-around"
    >
      <hero-list-player-item
        v-for="hero in $store.state.hero.list"
        :key="hero.id"
        :hero="hero"
        @select="() => select(hero)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    adminView: { type: Boolean, required: false, default: false },
  },
  methods: {
    select(hero: Hero): void {
      this.$store.commit('hero/SET_HERO', hero);
      this.$emit('select');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
