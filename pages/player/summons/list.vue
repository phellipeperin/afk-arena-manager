<template>
  <section>
    <ui-content-container>
      <summons-list />
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
      title: 'Groups',
      helpInfoEnabled: true,
      extraActions: [{
        icon: 'mdi-plus',
        callback: this.startSummons,
      }],
    });
  },
  methods: {
    startSummons(): void {
      // TODO
    },
  },
});
</script>

<style scoped lang="scss">

</style>
