<template>
  <section>
    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
      <profile-account-info-tab />
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 1">
      <profile-password-tab />
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
      title: 'Profile',
      tabs: ['Account', 'Password'],
    });
  },
});
</script>

<style scoped lang="scss">

</style>
