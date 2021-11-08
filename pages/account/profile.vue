<template>
  <div>
    <ui-page-header title="Profile" />

    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <account-system-info />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <account-change-password />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <account-game-info />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  methods: {
    logout(): void {
      this.$fire.auth.signOut().then(() => {
        this.$nuxt.$router.replace('/');
      });
    },
  },
});
</script>

<style scoped lang="scss">

</style>
