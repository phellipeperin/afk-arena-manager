<template>
  <div>
    <v-app-bar
      flat
      absolute
      dark
      shrink-on-scroll
      prominent
      :src="backgroundImage"
      scroll-target="#content"
      class="main-app-bar"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to right, rgba(53, 92, 125, 1), rgba(22, 22, 22, .9)"
        />
<!--          gradient="to right, rgba(53, 92, 125, 1), rgba(129, 207, 224, .9)"-->
      </template>

      <v-app-bar-nav-icon @click="sidebarOpen = true;" />

      <v-app-bar-title>{{ $store.state.system.pageState.title }}</v-app-bar-title>

      <v-spacer />

      <v-btn
        v-show="$store.state.system.pageState.heroFilterEnabled"
        icon
        @click="openHeroFilter"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-heart</v-icon>-->
<!--      </v-btn>-->

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-dots-vertical</v-icon>-->
<!--      </v-btn>-->
    </v-app-bar>

    <app-navigation-drawer v-model="sidebarOpen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const backgroundImage = require('~/assets/images/system/banner.jpg');

interface ComponentData {
  sidebarOpen: boolean;
  backgroundImage: string;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      sidebarOpen: false,
      backgroundImage,
    };
  },
});
</script>

<style scoped lang="scss">
.main-app-bar {
  z-index: 6;
}
</style>
