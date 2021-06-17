<template>
  <div>
    <ui-page-header title="Heroes" />

    <hero-list @select="openHeroDialog" />

    <hero-player-dialog v-model="dialogOpen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  dialogOpen: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
    };
  },
  methods: {
    openHeroDialog(): void {
      this.dialogOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
