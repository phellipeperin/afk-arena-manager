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
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon, { SummonStatus } from '~/application/domain/summon/summon';

interface ComponentData {
  selectedTab: number;
  tabs: Array<{ key: string, label: string }>;
}

export default Vue.extend({
  props: {
    summon: { type: Summon, required: true },
  },
  data(): ComponentData {
    return {
      selectedTab: 0,
      tabs: [
        { key: 'STONES', label: 'Stones' },
        { key: 'COMPANION', label: 'Companion' },
        { key: 'NORMAL', label: 'Normal' },
        { key: 'FACTION', label: 'Faction' },
        { key: 'HERO_CHOICE', label: 'Hero Choice' },
        { key: 'TIME_TEMPLE', label: 'Temple of Time' },
        { key: 'STARGAZER', label: 'Stargazer' },
        { key: 'FURNITURE', label: 'Furniture' },
      ],
    };
  },
  computed: {
    disabled(): boolean {
      return this.summon.status !== SummonStatus.IN_PROGRESS;
    },
  },
  methods: {
    changeTab(newTab: number): void {
      this.selectedTab = newTab;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
