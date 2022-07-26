<template>
  <div class="d-flex full-width">
    <div v-if="$store.state.filter.current.groupBy === 'NONE'">
      <hero-list-inner-group
        :list="list"
        :simple="simple"
        :mode="mode"
        @select="select"
      />
    </div>

    <div v-if="$store.state.filter.current.groupBy === 'FACTION'">
      <section
        v-for="section in factionSectionList"
        :key="section.label"
        class="mb-6"
      >
        <ui-sub-header
          class="ml-4"
          :text="section.label"
        />
        <hero-list-inner-group
          :list="section.heroList"
          :group-id="groupId"
          :simple="simple"
          :mode="mode"
          @select="select"
        />
      </section>
    </div>

    <div v-if="$store.state.filter.current.groupBy === 'ASCENSION'">
      <section
        v-for="section in ascensionSectionList"
        :key="section.label"
        class="mb-6"
      >
        <ui-sub-header
          class="ml-4"
          :text="section.label"
        />
        <hero-list-inner-group
          :list="section.heroList"
          :group-id="groupId"
          :simple="simple"
          :mode="mode"
          @select="select"
        />
      </section>
    </div>

    <div v-if="$store.state.filter.current.groupBy === 'SI'">
      <section
        v-for="section in signatureItemSectionList"
        :key="section.label"
        class="mb-6"
      >
        <ui-sub-header
          class="ml-4"
          :text="section.label"
        />
        <hero-list-inner-group
          :list="section.heroList"
          :group-id="groupId"
          :simple="simple"
          :mode="mode"
          @select="select"
        />
      </section>
    </div>

    <div v-if="$store.state.filter.current.groupBy === 'FURNITURE'">
      <section
        v-for="section in furnitureSectionList"
        :key="section.label"
        class="mb-6"
      >
        <ui-sub-header
          class="ml-4"
          :text="section.label"
        />
        <hero-list-inner-group
          :list="section.heroList"
          :group-id="groupId"
          :simple="simple"
          :mode="mode"
          @select="select"
        />
      </section>
    </div>

    <div v-if="$store.state.filter.current.groupBy === 'ENGRAVE'">
      <section
        v-for="section in engraveSectionList"
        :key="section.label"
        class="mb-6"
      >
        <ui-sub-header
          class="ml-4"
          :text="section.label"
        />
        <hero-list-inner-group
          :list="section.heroList"
          :group-id="groupId"
          :simple="simple"
          :mode="mode"
          @select="select"
        />
      </section>
    </div>

    <div v-if="$store.state.filter.current.groupBy === 'EQUIPMENT'">
      <section
        v-for="section in equipmentSectionList"
        :key="section.label"
        class="mb-6"
      >
        <ui-sub-header
          class="ml-4"
          :text="section.label"
        />
        <hero-list-inner-group
          :list="section.heroList"
          :group-id="groupId"
          :simple="simple"
          :mode="mode"
          @select="select"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { loadAscensionLabel, loadFactionLabel } from '~/application/services/textService';
import { Faction } from '~/application/domain/info/faction';
import { Ascension } from '~/application/domain/info/ascension';
import HeroEquip from '~/application/domain/hero/hero-equip';

interface HeroListSectionGroupBy {
  label: string;
  heroList: Array<Hero>;
}

export default Vue.extend({
  props: {
    list: { type: Array, required: true },
    groupId: { type: String, required: false, default: '' },
    simple: { type: Boolean, required: false, default: false },
    mode: { type: String, required: false, default: 'NORMAL', validator(value) { return ['NORMAL', 'QUICK'].includes(value); } },
  },
  computed: {
    factionSectionList(): Array<HeroListSectionGroupBy> {
      const sectionList: Array<HeroListSectionGroupBy> = [];
      sectionList.push({
        label: loadFactionLabel(Faction.Lightbearer),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.gameInfo.faction === Faction.Lightbearer),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Mauler),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.gameInfo.faction === Faction.Mauler),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Wilder),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.gameInfo.faction === Faction.Wilder),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Graveborn),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.gameInfo.faction === Faction.Graveborn),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Celestial),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.gameInfo.faction === Faction.Celestial),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Hypogean),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.gameInfo.faction === Faction.Hypogean),
      });
      sectionList.push({
        label: loadFactionLabel(Faction.Dimensional),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.gameInfo.faction === Faction.Dimensional),
      });
      return sectionList.filter((elem: HeroListSectionGroupBy) => !!elem.heroList.length);
    },
    ascensionSectionList(): Array<HeroListSectionGroupBy> {
      const sectionList: Array<HeroListSectionGroupBy> = [];
      sectionList.push({
        label: loadAscensionLabel(Ascension.Ascended5Star),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.ascension === Ascension.Ascended5Star),
      });
      sectionList.push({
        label: loadAscensionLabel(Ascension.Ascended),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.ascension === Ascension.Ascended || elem.playerInfo.ascension === Ascension.Ascended1Star || elem.playerInfo.ascension === Ascension.Ascended2Star || elem.playerInfo.ascension === Ascension.Ascended3Star || elem.playerInfo.ascension === Ascension.Ascended4Star),
      });
      sectionList.push({
        label: loadAscensionLabel(Ascension.Mythic),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.ascension === Ascension.Mythic || elem.playerInfo.ascension === Ascension.MythicPlus),
      });
      sectionList.push({
        label: loadAscensionLabel(Ascension.Legendary),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.ascension === Ascension.Legendary || elem.playerInfo.ascension === Ascension.LegendaryPlus),
      });
      sectionList.push({
        label: loadAscensionLabel(Ascension.Elite),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.ascension === Ascension.Elite || elem.playerInfo.ascension === Ascension.ElitePlus),
      });
      sectionList.push({
        label: loadAscensionLabel(Ascension.None),
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.ascension === Ascension.None),
      });
      return sectionList.filter((elem: HeroListSectionGroupBy) => !!elem.heroList.length);
    },
    signatureItemSectionList(): Array<HeroListSectionGroupBy> {
      const sectionList: Array<HeroListSectionGroupBy> = [];
      sectionList.push({
        label: 'SI 30 - 40',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.signatureItem >= 30),
      });
      sectionList.push({
        label: 'SI 20 - 29',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.signatureItem >= 20 && elem.playerInfo.signatureItem <= 29),
      });
      sectionList.push({
        label: 'SI 10 - 19',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.signatureItem >= 10 && elem.playerInfo.signatureItem <= 19),
      });
      sectionList.push({
        label: 'SI 0 - 9',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.signatureItem >= 0 && elem.playerInfo.signatureItem <= 9),
      });
      sectionList.push({
        label: 'SI Not Unlocked',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.signatureItem === -1),
      });
      return sectionList.filter((elem: HeroListSectionGroupBy) => !!elem.heroList.length);
    },
    furnitureSectionList(): Array<HeroListSectionGroupBy> {
      const sectionList: Array<HeroListSectionGroupBy> = [];
      sectionList.push({
        label: '9/9 Furniture',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.furniture >= 9),
      });
      sectionList.push({
        label: '4-8/9 Furniture',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.furniture <= 8 && elem.playerInfo.furniture >= 4),
      });
      sectionList.push({
        label: '3/9 Furniture',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.furniture === 3),
      });
      sectionList.push({
        label: '1-2/9 Furniture',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.furniture <= 2 && elem.playerInfo.furniture >= 1),
      });
      sectionList.push({
        label: 'No Furniture',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.furniture === 0),
      });
      return sectionList.filter((elem: HeroListSectionGroupBy) => !!elem.heroList.length);
    },
    engraveSectionList(): Array<HeroListSectionGroupBy> {
      const sectionList: Array<HeroListSectionGroupBy> = [];
      sectionList.push({
        label: 'Engrave 80 - 100',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.engrave >= 80),
      });
      sectionList.push({
        label: 'Engrave 60 - 79',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.engrave >= 60 && elem.playerInfo.engrave <= 79),
      });
      sectionList.push({
        label: 'Engrave 30 - 59',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.engrave >= 30 && elem.playerInfo.engrave <= 59),
      });
      sectionList.push({
        label: 'Engrave 1 - 29',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.engrave >= 1 && elem.playerInfo.engrave <= 29),
      });
      sectionList.push({
        label: 'Engrave Not Unlocked',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.engrave === -1 || elem.playerInfo.engrave === 0),
      });
      return sectionList.filter((elem: HeroListSectionGroupBy) => !!elem.heroList.length);
    },
    equipmentSectionList(): Array<HeroListSectionGroupBy> {
      const sectionList: Array<HeroListSectionGroupBy> = [];
      sectionList.push({
        label: 'Full T4 Equipments',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 4).length === 4),
      });
      sectionList.push({
        label: 'Full T3 Equipments',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 3).length === 4 && elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 4).length !== 4),
      });
      sectionList.push({
        label: 'Full T2 Equipments',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 2).length === 4 && elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 3).length !== 4),
      });
      sectionList.push({
        label: 'Full T1 Equipment',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 1).length === 4 && elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 2).length !== 4),
      });
      sectionList.push({
        label: 'Full T0 Equipment',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 0).length === 4 && elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier >= 1).length !== 4),
      });
      sectionList.push({
        label: 'Not Full Equipment',
        heroList: (this.list as Array<Hero>).filter((elem: Hero) => elem.playerInfo.equipment.filter((elem: HeroEquip) => elem.tier === -1).length > 0),
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
