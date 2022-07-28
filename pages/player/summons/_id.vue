<template>
  <section>
    <ui-content-container v-if="$store.state.system.pageState.selectedTab === 0">
      <summon-info-tab :summon="summon" />
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon from '~/application/domain/summon/summon';

interface ComponentData {
  summon: Summon;
}

export default Vue.extend({
  meta: {
    role: 'PREMIUM',
  },
  data(): ComponentData {
    return {
      summon: new Summon(),
    };
  },
  created(): void {
    this.summon = this.$store.state.summon.list.find((elem: Summon) => elem.id === this.$route.params.id);
    this.$store.commit('system/SET_PAGE_STATE', {
      title: `Summons - ${this.summon.label}`,
      canGoBack: true,
      tabs: ['Information'],
    });
  },
});
</script>

<style scoped lang="scss">

</style>
