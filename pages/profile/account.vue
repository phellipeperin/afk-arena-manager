<template>
  <section>
    <ui-content-container v-if="$store.state.system.pageState.selectedTab === 0">
      <account-profile-info-tab />
    </ui-content-container>

    <ui-content-container v-if="$store.state.system.pageState.selectedTab === 1">
      <account-password-tab />
    </ui-content-container>

    <ui-content-container v-if="$store.state.system.pageState.selectedTab === 2">
      <account-settings-tab />
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Account',
      tabs: ['Profile', 'Password', 'Settings'],
    });
  },
});
</script>

<style scoped lang="scss">

</style>
