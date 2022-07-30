<template>
  <article>
    <v-tabs
      color="primary"
      :value="selectedTab"
      @change="changeTab"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.key"
      >
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <section>
      <summon-pulls-inner-tab
        v-show="selectedTab === 0"
        :pulls="summonData.stones"
        mode="STONES"
        @update="updateStones"
      />
      <summon-pulls-inner-tab
        v-show="selectedTab === 1"
        :pulls="summonData.companion"
        mode="SCROLLS"
        @update="updateCompanion"
      />
      <summon-pulls-inner-tab
        v-show="selectedTab === 2"
        :pulls="summonData.normal"
        mode="SCROLLS"
        @update="updateNormal"
      />
      <summon-pulls-inner-tab
        v-show="selectedTab === 3"
        :pulls="summonData.faction"
        mode="SCROLLS"
        @update="updateFaction"
      />
      <summon-pulls-inner-tab
        v-show="selectedTab === 4"
        :pulls="summonData.heroChoice"
        mode="HERO_CHOICE"
        @update="updateHeroChoice"
      />
      <summon-pulls-inner-tab
        v-show="selectedTab === 5"
        :pulls="summonData.timeTemple"
        mode="TIME_TEMPLE"
        @update="updateTimeTemple"
      />
      <summon-pulls-inner-tab
        v-show="selectedTab === 6"
        :pulls="summonData.stargazer"
        mode="STARGAZER"
        @update="updateStargazer"
      />
      <summon-pulls-inner-tab
        v-show="selectedTab === 7"
        :pulls="summonData.furniture"
        mode="FURNITURE"
        @update="updateFurniture"
      />
      <summon-pulls-inner-tab
        v-show="selectedTab === 8"
        :pulls="summonData.cards"
        mode="CARDS"
        @update="updateCards"
      />
    </section>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon, { SummonStatus } from '~/application/domain/summon/summon';
import SummonPulls from '~/application/domain/summon/summonPulls';
import SummonPullsItem from '~/application/domain/summon/summonPullsItem';

interface ComponentData {
  selectedTab: number;
  summonData: SummonPulls;
  tabs: Array<{ key: string, label: string }>;
}

export default Vue.extend({
  props: {
    summon: { type: Summon, required: true },
  },
  data(): ComponentData {
    return {
      selectedTab: 0,
      summonData: new SummonPulls(),
      tabs: [
        { key: 'STONES', label: 'Stones' },
        { key: 'COMPANION', label: 'Companion' },
        { key: 'NORMAL', label: 'Normal' },
        { key: 'FACTION', label: 'Faction' },
        { key: 'HERO_CHOICE', label: 'Hero Choice' },
        { key: 'TIME_TEMPLE', label: 'Temple of Time' },
        { key: 'STARGAZER', label: 'Stargazer' },
        { key: 'FURNITURE', label: 'Furniture' },
        { key: 'CARDS', label: 'Cards' },
      ],
    };
  },
  computed: {
    disabled(): boolean {
      return this.summon.status !== SummonStatus.IN_PROGRESS;
    },
  },
  created(): void {
    this.summonData = this.summon.data;
  },
  methods: {
    changeTab(newTab: number): void {
      this.selectedTab = newTab;
    },
    async updatePulls(newData: any): Promise<void> {
      this.summonData = { ...this.summonData, ...newData };
      const summonDocRef = this.$fire.firestore.collection(`users/${this.$store.state.user.user.id}/summons`).doc(this.summon.id);
      await summonDocRef.update(JSON.parse(JSON.stringify({ data: this.summonData })));
    },
    // Updates
    async updateStones(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ stones: newPulls });
    },
    async updateCompanion(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ companion: newPulls });
    },
    async updateNormal(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ normal: newPulls });
    },
    async updateFaction(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ faction: newPulls });
    },
    async updateHeroChoice(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ heroChoice: newPulls });
    },
    async updateTimeTemple(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ timeTemple: newPulls });
    },
    async updateStargazer(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ stargazer: newPulls });
    },
    async updateFurniture(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ furniture: newPulls });
    },
    async updateCards(newPulls: SummonPullsItem): Promise<void> {
      await this.updatePulls({ cards: newPulls });
    },
  },
});
</script>

<style scoped lang="scss">

</style>
