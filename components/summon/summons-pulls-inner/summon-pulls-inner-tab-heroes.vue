<template>
  <div>
    <v-divider class="my-6" />
    <section
      v-for="section in sectionItems"
      :key="section.eventName"
      class="mb-4"
    >
      <ui-sub-header :text="section.label" />
      <div class="d-flex flex-wrap">
        <ui-card
          v-for="(hero, index) in section.pullsList"
          :key="`${section-eventName}-${index}`"
          class="hero-choice-card py-1 px-4 mr-4 mb-4"
        >
          <v-autocomplete
            :value="hero"
            :items="section.heroItemList"
            :label="`Hero #${index + 1}`"
            auto-select-first
            hide-details
            item-text="label"
            item-value="value"
            @change="(newValue) => update(section.eventName, index, newValue)"
          />
        </ui-card>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SummonPullsItem from '~/application/domain/summon/summonPullsItem';
import { Faction } from '~/application/domain/info/faction';

interface HeroItem {
  label: string;
  value: string;
}

interface Section {
  label: string;
  eventName: string;
  pullsList: Array<string>;
  heroItemList: Array<HeroItem>;
}

export default Vue.extend({
  props: {
    pulls: { type: SummonPullsItem, required: true },
  },
  computed: {
    sectionItems(): Array<Section> {
      const list: Array<Section> = [];
      if (this.pulls.elite.length) {
        list.push({ label: 'Elite Heroes', eventName: 'updateElite', pullsList: this.pulls.elite, heroItemList: this.eliteHeroes });
      }
      if (this.pulls.star.length) {
        list.push({ label: 'Star Heroes', eventName: 'updateStar', pullsList: this.pulls.star, heroItemList: this.starHeroes });
      }
      if (this.pulls.awakened.length) {
        list.push({ label: 'Awakened Heroes', eventName: 'updateAwakened', pullsList: this.pulls.awakened, heroItemList: this.awakenedHeroes });
      }
      if (this.pulls.mythicFurniture.length) {
        list.push({ label: 'Elite Heroes', eventName: 'updateMythicFurniture', pullsList: this.pulls.mythicFurniture, heroItemList: this.furnitureHeroes });
      }
      if (this.pulls.cardHero.length) {
        list.push({ label: 'Elite Heroes Cards', eventName: 'updateCardHero', pullsList: this.pulls.cardHero, heroItemList: this.normalFactionHeroes });
      }
      if (this.pulls.cardFurniture.length) {
        list.push({ label: 'Furniture Cards', eventName: 'updateCardFurniture', pullsList: this.pulls.cardFurniture, heroItemList: this.furnitureHeroes });
      }
      return list;
    },
    eliteHeroes(): Array<HeroItem> {
      return this.mapHeroListToSelect(this.$store.state.hero.list.filter((elem: Hero) => elem.gameInfo.faction !== Faction.Dimensional && !elem.gameInfo.awakened));
    },
    normalFactionHeroes(): Array<HeroItem> {
      return this.mapHeroListToSelect(this.$store.state.hero.list.filter((elem: Hero) => (elem.gameInfo.faction === Faction.Lightbearer || elem.gameInfo.faction === Faction.Mauler || elem.gameInfo.faction === Faction.Wilder || elem.gameInfo.faction === Faction.Graveborn) && !elem.gameInfo.awakened));
    },
    starHeroes(): Array<HeroItem> {
      return this.mapHeroListToSelect(this.$store.state.hero.list.filter((elem: Hero) => (elem.gameInfo.faction === Faction.Celestial || elem.gameInfo.faction === Faction.Hypogean) && !elem.gameInfo.awakened));
    },
    awakenedHeroes(): Array<HeroItem> {
      return this.mapHeroListToSelect(this.$store.state.hero.list.filter((elem: Hero) => elem.gameInfo.awakened));
    },
    furnitureHeroes(): Array<HeroItem> {
      return this.mapHeroListToSelect(this.$store.state.hero.list);
    },
  },
  methods: {
    update(eventName: string, index: number, value: string): void {
      this.$emit(eventName, { index, value });
    },
    mapHeroListToSelect(heroList: Array<Hero>): Array<HeroItem> {
      return heroList.map((elem: Hero) => ({ value: elem.id, label: elem.gameInfo.name }));
    },
  },
});
</script>

<style scoped lang="scss">
.hero-choice-card {
  width: 240px;
}
</style>
