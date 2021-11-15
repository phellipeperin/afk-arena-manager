<template>
  <section>
    <ui-content-container>
      <hero-list
        :player-id="$store.state.user.user.id"
        @select="openHeroDialog"
      />

      <template #friend="{ friend }">
        <hero-list :player-id="friend.id" />
      </template>
    </ui-content-container>

    <hero-player-dialog v-model="dialogOpen" />
  </section>
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
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Heroes',
      heroFilterEnabled: true,
      compareEnabled: true,
    });
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
