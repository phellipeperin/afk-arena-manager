<template>
  <div class="d-flex full-width">
    <div v-if="$store.state.filter.groupBy === 'NONE'">
      <hero-list-inner-group
        :list="list"
        @select="select"
      />
    </div>

    <div v-if="$store.state.filter.groupBy === 'FACTION'">
      <section
        v-for="section in factionSectionList"
        :key="section.label"
        class="mb-6"
      >
        <ui-sub-header :text="section.label" />
        <hero-list-inner-group
          :list="section.heroList"
          @select="select"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { loadFactionLabel } from '~/application/services/textService';
import { Faction } from '~/application/domain/info/faction';

interface HeroListSectionGroupBy {
  label: string;
  heroList: Array<Hero>;
}

export default Vue.extend({
  props: {
    list: { type: Array, required: true },
  },
  computed: {
    factionSectionList(): Array<HeroListSectionGroupBy> {
      const sectionList: Array<HeroListSectionGroupBy> = [];
      sectionList.push({
        label: loadFactionLabel(Faction.Lightbearer),
        heroList: this.list.filter((elem: Hero) => elem.gameInfo.faction === Faction.Lightbearer),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Mauler),
        heroList: this.list.filter((elem: Hero) => elem.gameInfo.faction === Faction.Mauler),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Wilder),
        heroList: this.list.filter((elem: Hero) => elem.gameInfo.faction === Faction.Wilder),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Graveborn),
        heroList: this.list.filter((elem: Hero) => elem.gameInfo.faction === Faction.Graveborn),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Celestial),
        heroList: this.list.filter((elem: Hero) => elem.gameInfo.faction === Faction.Celestial),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Hypogean),
        heroList: this.list.filter((elem: Hero) => elem.gameInfo.faction === Faction.Hypogean),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Dimensional),
        heroList: this.list.filter((elem: Hero) => elem.gameInfo.faction === Faction.Dimensional),
      });
      return sectionList.filter((elem: HeroListSectionGroupBy) => !!elem.heroList.length);
    },
  },
  methods: {
    select(hero: Hero): void {
      this.$emit('select', hero);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
