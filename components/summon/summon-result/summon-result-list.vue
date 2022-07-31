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
      <v-row>
        <v-col
          v-for="resultHero in section.items"
          :key="resultHero.currentHero.id"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <ui-card
            :outlined="false"
            elevation="0"
            class="full-height"
          >
            <div class="d-flex align-center justify-center full-width">
              <hero-list-player-item
                :hero="resultHero.currentHero"
                not-selectable
                small
                class="d-inline-block"
              />
              <hero-list-player-item
                :hero="resultHero.finalHero"
                not-selectable
                class="d-inline-block"
              />
            </div>
            <div
              v-if="resultHero.changes.length"
              class="d-flex align-center justify-center flex-column full-width"
            >
              <p
                v-for="change in resultHero.changes"
                :key="`${resultHero.currentHero.id}-${change}`"
                class="mb-0 text-caption"
              >
                {{ change }}
              </p>
            </div>
            <div
              v-if="resultHero.possibleAscensions.length"
              class="d-flex align-center justify-center full-width"
            >
              <ui-selector-ascension
                :value="resultHero.finalHero.playerInfo.ascension"
                :single-options="resultHero.possibleAscensions"
                @input="(newValue) => changeHeroAscension(resultHero, newValue)"
              />
            </div>
          </ui-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SummonResult from '~/application/domain/summon/summonResult';
import SummonResultHero from '~/application/domain/summon/summonResultHero';
import { loadFactionLabel } from '~/application/services/textService';
import { Faction } from '~/application/domain/info/faction';
import { Ascension } from '~/application/domain/info/ascension';

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
  methods: {
    changeHeroAscension(resultHero: SummonResultHero, newValue: string): void {
      this.$emit('changeHeroAscension', { heroId: resultHero.finalHero.id, ascension: newValue as Ascension });
    },
  },
});
</script>

<style scoped lang="scss">

</style>
