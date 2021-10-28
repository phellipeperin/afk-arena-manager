<template>
  <div class="d-flex full-width">
    <div v-if="$store.state.filter.groupBy === 'NONE'">
      <transition-group
        appear
        name="fade"
        class="d-flex flex-wrap justify-space-around"
      >
        <hero-list-player-item
          v-for="hero in list"
          :key="hero.id"
          :hero="hero"
          @select="() => select(hero)"
        />
      </transition-group>
    </div>

    <div v-if="$store.state.filter.groupBy === 'FACTION'">
      <section
        v-for="section in factionSectionList"
        :key="section.label"
        class="mb-8"
      >
        <ui-sub-header
          v-show="!!section.heroList.length"
          :text="section.label"
        />
        <transition-group
          v-show="!!section.heroList.length"
          appear
          name="fade"
          class="d-flex flex-wrap justify-space-around"
        >
          <hero-list-player-item
            v-for="hero in section.heroList"
            :key="hero.id"
            :hero="hero"
            @select="() => select(hero)"
          />
        </transition-group>
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
      const sectionList = [];
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
      return sectionList;
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
.fade-enter-active {
  transition: opacity ease .4s .3s;
}
.fade-leave-active {
  transition: opacity ease .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
