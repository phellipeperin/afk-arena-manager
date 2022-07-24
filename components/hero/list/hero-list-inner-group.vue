<template>
  <transition-group
    appear
    name="fade"
    class="d-flex flex-wrap"
  >
    <hero-list-player-item
      v-for="hero in list"
      :key="hero.id"
      :hero="hero"
      :simple="simple"
      :mode="mode"
      @select="() => select(hero)"
    />
  </transition-group>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    list: { type: Array, required: true },
    simple: { type: Boolean, required: false, default: false },
    mode: { type: String, required: false, default: 'NORMAL', validator(value) { return ['NORMAL', 'QUICK'].includes(value); } },
  },
  methods: {
    select(hero: Hero): void {
      this.$emit('select', hero);
    },
  },
});
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: opacity ease .4s .3s;
}
.fade-leave-active {
  transition: opacity ease .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
