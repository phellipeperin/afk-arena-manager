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
import SummonPulls from '~/application/domain/summon/summonPulls';
import SummonPullsItem from '~/application/domain/summon/summonPullsItem';

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
        const summonData = summonDoc.data() || new Summon();
        this.summon = new Summon(summonData.id, summonData.label, summonData.status, new SummonPulls(
          this.createSummonPullsItem(summonData.data.stones),
          this.createSummonPullsItem(summonData.data.companion),
          this.createSummonPullsItem(summonData.data.normal),
          this.createSummonPullsItem(summonData.data.faction),
          this.createSummonPullsItem(summonData.data.heroChoice),
          this.createSummonPullsItem(summonData.data.timeTemple),
          this.createSummonPullsItem(summonData.data.stargazer),
          this.createSummonPullsItem(summonData.data.furniture),
          this.createSummonPullsItem(summonData.data.cards),
        ));
      }
    },
    createSummonPullsItem(firebaseData: SummonPullsItem): SummonPullsItem {
      return new SummonPullsItem(firebaseData.total, firebaseData.elite, firebaseData.star, firebaseData.awakened, firebaseData.mythicFurniture, firebaseData.cardHero, firebaseData.cardFurniture);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
