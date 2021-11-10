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
      </template>

      <v-app-bar-nav-icon @click="sidebarOpen = true;" />
      <v-app-bar-title>
        <h6 class="text-h6 text-uppercase">
          {{ $store.state.system.pageState.title }}
        </h6>
      </v-app-bar-title>

      <v-spacer />

      <v-btn
        v-for="action in $store.state.system.pageState.extraActions"
        :key="`header-action-${action.icon}`"
        icon
        @click="() => { action.callback(); }"
      >
        <v-icon>{{ action.icon }}</v-icon>
      </v-btn>

<!--          <v-btn-->
<!--            v-if="$store.state.system.pageState.compareEnabled"-->
<!--            icon-->
<!--            v-on="on"-->
<!--            @click="enterCompareMode"-->
<!--          >-->
<!--            <v-icon>mdi-compare</v-icon>-->
<!--          </v-btn>-->

      <v-btn
        v-if="$store.state.system.pageState.heroFilterEnabled"
        icon
        @click="heroFilterOpen = true;"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-app-bar>

    <app-navigation-drawer v-model="sidebarOpen" />
    <hero-filter
      v-show="$store.state.system.pageState.heroFilterEnabled"
      v-model="heroFilterOpen"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const backgroundImage = require('~/assets/images/system/banner.jpg');

interface ComponentData {
  sidebarOpen: boolean;
  heroFilterOpen: boolean;
  backgroundImage: string;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      sidebarOpen: false,
      heroFilterOpen: false,
      backgroundImage,
    };
  },
  watch: {
    $route: {
      handler(): void {
        this.$store.commit('system/RESET_PAGE_STATE');
      },
    },
  },
});
</script>

<style lang="scss">
.main-app-bar {
  z-index: 6;
}

.v-app-bar-title__content {
  min-width: 300px !important;
}
</style>
