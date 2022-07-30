<template>
  <div>
    <section
      v-for="section in sectionList"
      :key="section.label"
    >
      <ui-sub-header
        :text="section.label"
        class="mt-6"
      />
      <div class="d-flex">
        <hero-list-player-item
          v-for="resultHero in section.items"
          :key="resultHero.currentHero.id"
          :hero="resultHero.currentHero"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SummonResult from '~/application/domain/summon/summonResult';
import SummonResultHero from '~/application/domain/summon/summonResultHero';
import { loadFactionLabel } from '~/application/services/textService';
import { Faction } from '~/application/domain/info/faction';

interface Section {
  label: string;
  items: Array<SummonResultHero>;
}

export default Vue.extend({
  props: {
    result: { type: SummonResult, required: true },
  },
  computed: {
    sectionList(): Array<Section> {
      const list: Array<Section> = [];

      const lightbearerHeroes = this.result.items.filter((resultHero: SummonResultHero) => resultHero.currentHero.gameInfo.faction === Faction.Lightbearer);
      if (lightbearerHeroes.length) {
        list.push({ label: loadFactionLabel(Faction.Lightbearer), items: lightbearerHeroes });
      }

      const maulerHeroes = this.result.items.filter((resultHero: SummonResultHero) => resultHero.currentHero.gameInfo.faction === Faction.Mauler);
      if (maulerHeroes.length) {
        list.push({ label: loadFactionLabel(Faction.Mauler), items: maulerHeroes });
      }

      const wilderHeroes = this.result.items.filter((resultHero: SummonResultHero) => resultHero.currentHero.gameInfo.faction === Faction.Wilder);
      if (wilderHeroes.length) {
        list.push({ label: loadFactionLabel(Faction.Wilder), items: wilderHeroes });
      }

      const gravebornHeroes = this.result.items.filter((resultHero: SummonResultHero) => resultHero.currentHero.gameInfo.faction === Faction.Graveborn);
      if (gravebornHeroes.length) {
        list.push({ label: loadFactionLabel(Faction.Graveborn), items: gravebornHeroes });
      }

      const celestialHeroes = this.result.items.filter((resultHero: SummonResultHero) => resultHero.currentHero.gameInfo.faction === Faction.Celestial);
      if (celestialHeroes.length) {
        list.push({ label: loadFactionLabel(Faction.Celestial), items: celestialHeroes });
      }

      const hypogeanHeroes = this.result.items.filter((resultHero: SummonResultHero) => resultHero.currentHero.gameInfo.faction === Faction.Hypogean);
      if (hypogeanHeroes.length) {
        list.push({ label: loadFactionLabel(Faction.Hypogean), items: hypogeanHeroes });
      }

      const dimensionalHeroes = this.result.items.filter((resultHero: SummonResultHero) => resultHero.currentHero.gameInfo.faction === Faction.Dimensional);
      if (dimensionalHeroes.length) {
        list.push({ label: loadFactionLabel(Faction.Dimensional), items: dimensionalHeroes });
      }

      return list;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
