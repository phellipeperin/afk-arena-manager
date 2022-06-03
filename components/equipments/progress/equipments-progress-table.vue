<template>
  <section>
    <ui-card-skeleton-loader v-if="loading" />
    <v-simple-table
      v-else
      class="progress-table"
    >
      <thead>
        <tr>
          <th style="width: 8%;" />
          <th style="width: 23%;">
            <img
              :src="strImage"
              alt="str"
              class="type-image"
            >
          </th>
          <th style="width: 23%;">
            <img
              :src="dexImage"
              alt="dex"
              class="type-image"
            >
          </th>
          <th style="width: 23%;">
            <img
              :src="intImage"
              alt="int"
              class="type-image"
            >
          </th>
          <th style="width: 23%;">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <equipments-progress-table-row
          :data="information"
          :faction="lightbearerFaction"
          @showList="openDialog"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="maulerFaction"
          @showList="openDialog"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="wilderFaction"
          @showList="openDialog"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="gravebornFaction"
          @showList="openDialog"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="celestialFaction"
          @showList="openDialog"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="hypogeanFaction"
          @showList="openDialog"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="dimensionalFaction"
          @showList="openDialog"
        />
        <equipments-progress-table-row
          :data="information"
          @showList="openDialog"
        />
      </tbody>
    </v-simple-table>

    <app-dialog
      :value="dialog"
      title="Heroes"
      max-width="730"
      @input="closeDialog"
    >
      <div class="d-flex flex-wrap">
        <hero-list-player-item
          v-for="hero in dialogHeroList"
          :key="hero.id"
          :hero="hero"
        />
      </div>
    </app-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadTypeImage } from '~/application/services/imageService';
import { Type } from '~/application/domain/info/type';
import EquipmentInformationProgressCollection from '~/application/domain/equipment/equipmentInformationProgressCollection';
import { Faction } from '~/application/domain/info/faction';
import { generateEquipmentInformationProgress } from '~/application/services/equipment/equipmentProgressService';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  information: EquipmentInformationProgressCollection;
  loading: boolean;
  dialog: boolean;
  dialogHeroList: Array<Hero>;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      information: new EquipmentInformationProgressCollection(),
      loading: true,
      dialog: false,
      dialogHeroList: [],
    };
  },
  computed: {
    strImage(): string { return loadTypeImage(Type.STR); },
    dexImage(): string { return loadTypeImage(Type.DEX); },
    intImage(): string { return loadTypeImage(Type.INT); },

    lightbearerFaction(): Faction { return Faction.Lightbearer; },
    maulerFaction(): Faction { return Faction.Mauler; },
    wilderFaction(): Faction { return Faction.Wilder; },
    gravebornFaction(): Faction { return Faction.Graveborn; },
    celestialFaction(): Faction { return Faction.Celestial; },
    hypogeanFaction(): Faction { return Faction.Hypogean; },
    dimensionalFaction(): Faction { return Faction.Dimensional; },
  },
  created(): void {
    this.information = generateEquipmentInformationProgress(this.$store.getters['hero/baseHeroList'](this.playerId));
    this.loading = false;
  },
  methods: {
    openDialog(heroList: Array<Hero>): void {
      this.dialogHeroList = heroList;
      this.dialog = true;
    },
    closeDialog(): void {
      this.dialog = false;
    },
  },
});
</script>

<style scoped lang="scss">
.progress-table {
  background-color: transparent;

  th {
    text-align: center !important;
  }

  .type-image {
    width: 32px;
    height: 32px;
  }
}
</style>
