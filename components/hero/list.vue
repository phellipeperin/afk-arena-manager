<template>
  <div class="d-flex flex-wrap justify-space-around">
    <hero-list-item
      v-for="hero in $store.state.hero.list"
      :key="hero.id"
      :hero="hero"
      :on-admin-view="adminView"
      @select="() => select(hero)"
    />
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
