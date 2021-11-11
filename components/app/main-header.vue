<template>
  <header>
    <v-app-bar
      dark
      tile
      absolute
      max-height="104"
      :shrink-on-scroll="!hasTabs"
      :src="backgroundImage"
      scroll-target="#content"
      :class="`main-app-bar ${hasTabs ? 'with-tabs' : ''}`"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to right, rgba(53, 92, 125, 1), rgba(22, 22, 22, .9)"
        />
      </template>

      <template
        v-if="hasTabs"
        #extension
      >
        <v-tabs
          :value="$store.state.system.pageState.selectedTab"
          :show-arrows="$vuetify.breakpoint.smAndDown"
          align-with-title
          color="white"
          @change="changeTab"
        >
          <v-tab
            v-for="tab in $store.state.system.pageState.tabs"
            :key="tab"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>
      </template>

      <v-app-bar-nav-icon @click="sidebarOpen = true;" />
      <v-app-bar-title>
        <h6 class="text-h6">
          {{ $store.state.system.pageState.title }}
        </h6>
      </v-app-bar-title>

      <v-spacer />

      <v-btn
        v-if="$store.state.system.pageState.helpInfoEnabled"
        icon
        @click="openHelpInfo"
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>

      <v-btn
        v-for="action in $store.state.system.pageState.extraActions"
        :key="`header-action-${action.icon}`"
        icon
        @click="() => { action.callback(); }"
      >
        <v-icon>{{ action.icon }}</v-icon>
      </v-btn>

      <v-btn
        v-if="$store.state.system.pageState.compareEnabled"
        icon
        @click="enterCompareMode"
      >
        <v-icon>mdi-compare</v-icon>
      </v-btn>

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
  </header>
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
  computed: {
    hasTabs(): boolean {
      return this.$store.state.system.pageState.tabs?.length;
    },
  },
  methods: {
    changeTab(index: number): void {
      this.$store.commit('system/SET_PAGE_STATE_SELECTED_TAB', index);
    },
    openHelpInfo(): void {
      this.$store.commit('system/SET_PAGE_STATE_HELP_DIALOG_OPEN', true);
    },
    enterCompareMode(): void {
      // TODO
    },
  },
});
</script>

<style lang="scss">
.main-app-bar {
  z-index: 6 !important;

  .v-toolbar__content {
    max-height: 104px;
  }

  .v-app-bar-title__content {
    min-width: 300px !important;
  }

  &.with-tabs {
    .v-toolbar__content {
      max-height: 54px;
    }
  }
}

</style>
