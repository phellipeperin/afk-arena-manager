<template>
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Profile',
    });
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
