<template>
  <section>
    <ui-card-skeleton-loader v-if="loading" />

    <template v-else>
      <ui-content-container v-if="$store.state.system.pageState.selectedTab === 0">
        <summon-info-tab :summon="summon" />
      </ui-content-container>

      <ui-content-container v-if="$store.state.system.pageState.selectedTab === 1">
        <summon-pulls-tab :summon="summon" />
      </ui-content-container>

      <ui-content-container v-if="$store.state.system.pageState.selectedTab === 2">
        <summon-result-tab :summon="summon" />
      </ui-content-container>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon, { SummonStatus } from '~/application/domain/summon/summon';

interface ComponentData {
  summon: Summon;
  loading: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PREMIUM',
  },
  data(): ComponentData {
    return {
      summon: new Summon(),
      loading: true,
    };
  },
  watch: {
    '$store.state.system.pageState.selectedTab': {
      async handler(): Promise<void> {
        this.loading = true;
        await this.loadSummon();
        const tabs = ['Information', 'Pulls'];
        if (this.summon.status === SummonStatus.VALIDATING) {
          tabs.push('Result');
        }
        this.$store.commit('system/SET_PAGE_STATE', {
          title: `Summons - ${this.summon.label}`,
          canGoBack: true,
          tabs,
        });
        this.loading = false;
      },
      immediate: true,
    },
  },
  methods: {
    async loadSummon(): Promise<void> {
      const summonDocRef = this.$fire.firestore.collection(`users/${this.$store.state.user.user.id}/summons`).doc(this.$route.params.id);
      const summonDoc = await summonDocRef.get();
      if (summonDoc.exists) {
        const summonData = summonDoc.data();
        this.summon = new Summon(summonData.id, summonData.label, summonData.status, summonData.data);
      }
    },
  },
});
</script>

<style scoped lang="scss">

</style>
