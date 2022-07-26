<template>
  <section>
    <ui-content-container>
      <hero-list
        :player-id="$store.state.user.user.id"
        mode="QUICK"
      />

      <template #friend="{ friend }">
        <hero-list
          :player-id="friend.id"
          mode="QUICK"
        />
      </template>
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  meta: {
    role: 'PREMIUM',
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Heroes - Quick Edit',
      heroFilterEnabled: true,
      heroSearchEnabled: true,
    });
  },
});
</script>

<style scoped lang="scss">

</style>
