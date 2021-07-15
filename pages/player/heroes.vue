<template>
  <div>
    <ui-page-header
      title="Heroes"
      :subtitle="pageSubtitle"
    >
      <v-btn
        outlined
        color="primary"
        @click.stop="startCompare"
      >
        Cancel Compare
      </v-btn>
      <v-btn
        raised
        color="primary"
        @click.stop="startCompare"
      >
        Compare with Friends
      </v-btn>
    </ui-page-header>

    <hero-list
      @select="openHeroDialog"
      @update="updatePageSubtitle"
    />

    <hero-player-dialog v-model="dialogOpen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  dialogOpen: boolean;
  pageSubtitle: string;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
      pageSubtitle: '',
    };
  },
  methods: {
    openHeroDialog(): void {
      this.dialogOpen = true;
    },
    updatePageSubtitle(total: number, filtered: number): void {
      this.pageSubtitle = `Showing ${filtered} of ${total} heroes`;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
