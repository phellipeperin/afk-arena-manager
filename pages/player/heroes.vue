<template>
  <div>
    <ui-page-header
      title="Heroes"
      :subtitle="pageSubtitle"
    >
      <app-compare-buttons
        :on-compare="onCompare"
        @update="setCompare"
      />
    </ui-page-header>

    <app-compare-container :on-compare="onCompare">
      <template #fallback>
        <hero-list
          show-filter
          :player-id="$store.state.user.user.id"
          @select="openHeroDialog"
          @update="updatePageSubtitle"
        />
      </template>

      <template #user>
        <hero-list
          show-filter
          :player-id="$store.state.user.user.id"
          @select="openHeroDialog"
          @update="updatePageSubtitle"
        />
      </template>
    </app-compare-container>

    <hero-player-dialog v-model="dialogOpen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  dialogOpen: boolean;
  onCompare: boolean;
  pageSubtitle: string;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
      onCompare: true,
      pageSubtitle: '',
    };
  },
  methods: {
    openHeroDialog(): void {
      this.dialogOpen = true;
    },
    setCompare(state: boolean): void {
      this.onCompare = state;
    },
    updatePageSubtitle(total: number, filtered: number): void {
      this.pageSubtitle = `Showing ${filtered} of ${total} heroes`;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
