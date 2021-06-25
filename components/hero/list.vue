<template>
  <div class="d-flex">
    <div v-if="adminView">
      <transition-group
        name="fade"
        class="d-flex flex-wrap justify-space-around"
      >
        <hero-list-admin-item
          v-for="hero in $store.state.hero.list"
          :key="hero.id"
          :hero="hero"
          @select="() => select(hero)"
        />
      </transition-group>
    </div>
    <div v-else>
      <transition-group
        appear
        name="fade"
        class="d-flex flex-wrap justify-space-around"
      >
        <hero-list-player-item
          v-for="hero in $store.state.hero.list"
          :key="hero.id"
          :hero="hero"
          @select="() => select(hero)"
        />
      </transition-group>
    </div>

    <v-btn
      fab
      fixed
      right
      bottom
      large
      color="primary"
      elevation="3"
      @click="openFilter"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>

    <v-bottom-sheet v-model="isFilterOpen">
      <v-sheet
        class="text-center"
        height="200px"
      >
        <div class="my-3">
          This is a bottom sheet using the inset prop
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  isFilterOpen: boolean;
}

export default Vue.extend({
  props: {
    adminView: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      isFilterOpen: false,
    };
  },
  methods: {
    select(hero: Hero): void {
      this.$store.commit('hero/SET_HERO', hero);
      this.$emit('select');
    },
    openFilter(): void {
      this.isFilterOpen = true;
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
