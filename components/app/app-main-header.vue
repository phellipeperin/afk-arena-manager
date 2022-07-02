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
      <template #img="{ props }">
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
        :color="$store.state.compare.onCompare ? 'accent' : ''"
        @click="toggleCompareMode"
      >
        <v-icon>mdi-compare</v-icon>
      </v-btn>

      <v-text-field
        v-show="$store.state.system.pageState.heroSearchEnabled && heroSearchOpen"
        ref="textSearchField"
        :value="$store.state.filter.current.textSearch"
        autofocus
        hide-details
        append-icon="mdi-close"
        color="secondary"
        class="text-search-field mb-0 mt-1"
        @input="(value) => $store.commit('filter/SET_TEXT_SEARCH', value)"
        @click:append="clearSearch"
      />

      <v-btn
        v-show="$store.state.system.pageState.heroSearchEnabled && !heroSearchOpen"
        icon
        @click="heroSearchOpen = true;"
      >
        <v-icon>mdi-magnify</v-icon>
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
  heroSearchOpen: boolean;
  backgroundImage: string;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      sidebarOpen: false,
      heroFilterOpen: false,
      heroSearchOpen: false,
      backgroundImage,
    };
  },
  computed: {
    hasTabs(): boolean {
      return this.$store.state.system.pageState.tabs?.length;
    },
  },
  watch: {
    $route: {
      handler(): void {
        this.$store.commit('system/RESET');
        this.$store.commit('compare/RESET');
        this.$store.commit('filter/RESET');
      },
    },
  },
  created(): void {
    // eslint-disable-next-line nuxt/no-globals-in-created
    document.addEventListener('keyup', (e: any) => {
      if (e.keyCode === 27 && this.heroSearchOpen) {
        this.clearSearch();
        return;
      }

      if (!(e.keyCode >= 65 && e.keyCode <= 90) && !(e.keyCode >= 97 && e.keyCode <= 122)) {
        return;
      }

      if (!this.heroSearchOpen) {
        this.heroSearchOpen = true;
        this.$store.commit('filter/SET_TEXT_SEARCH', this.$store.state.filter.current.textSearch + e.key);
      }
      if (!(this.$refs.textSearchField as any)?.isFocused) {
        (this.$refs.textSearchField as any).focus();
      }
    });
  },
  methods: {
    changeTab(index: number): void {
      this.$store.commit('system/SET_PAGE_STATE_SELECTED_TAB', index);
    },
    openHelpInfo(): void {
      this.$store.commit('system/SET_PAGE_STATE_HELP_DIALOG_OPEN', true);
    },
    toggleCompareMode(): void {
      this.$store.commit('compare/SET_ON_COMPARE', !this.$store.state.compare.onCompare);
    },
    clearSearch(): void {
      this.$store.commit('filter/SET_TEXT_SEARCH', '');
      this.heroSearchOpen = false;
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

  .text-search-field {
    max-width: 240px;
  }

  &.with-tabs {
    .v-toolbar__content {
      max-height: 54px;
    }
  }
}
</style>
