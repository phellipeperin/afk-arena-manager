<template>
  <section>
    <ui-content-container>
      <hero-list
        :player-id="$store.state.user.user.id"
        mode="OBJECTIVE"
        @select="openHeroDialog"
      />
    </ui-content-container>

    <hero-player-dialog v-model="dialogOpen" />

    <v-btn
      fab
      right
      bottom
      large
      color="accent"
      class="fab-button"
      @click="finish"
    >
      <v-icon>mdi-check</v-icon>
    </v-btn>
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
      title: 'Edit Objective',
    });
    if (this.$route.params.id === 'personal') {
      // TODO load personal objective heroes
    }
  },
  methods: {
    finish(): void {
      this.$nuxt.$router.push('/player/objectives/list');
    },
    openHeroDialog(): void {
      this.dialogOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">
.fab-button {
  position: fixed;
  right: 24px;
  bottom: 24px;
}
</style>
