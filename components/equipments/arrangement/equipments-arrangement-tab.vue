<template>
  <section>
    <ui-card-skeleton-loader v-if="loading" />
    <section
      v-else
      class="progress-table"
    >
      <ui-no-result
        v-if="!basicInformation.list.length && !resetInformation.list.length && !extraInformation.list.length"
        text="It seems you are all good !!"
      />
      <v-container
        v-else
        fluid
      >
        <article v-if="basicInformation.list.length">
          <ui-sub-header text="Basic Information" />
          <v-row class="mb-6">
            <equipments-arrangement-hero
              v-for="heroInfo in basicInformation.list"
              :key="heroInfo.hero.id"
              :info="heroInfo"
              @swap="swap"
            />
          </v-row>
        </article>
        <article v-if="resetInformation.list.length">
          <ui-sub-header text="Reset Information" />
          <v-row class="mb-6">
            <equipments-arrangement-hero
              v-for="heroInfo in resetInformation.list"
              :key="heroInfo.hero.id"
              :info="heroInfo"
              @swap="swap"
            />
          </v-row>
        </article>
        <article v-if="extraInformation.list.length">
          <ui-sub-header text="Extra Information" />
          <v-row class="mb-6">
            <equipments-arrangement-hero
              v-for="heroInfo in extraInformation.list"
              :key="heroInfo.hero.id"
              :info="heroInfo"
              @swap="swap"
            />
          </v-row>
        </article>
      </v-container>
    </section>

    <equipments-swap-dialog
      :value="swapDialog"
      :hero1="swapHero1"
      :hero2="swapHero2"
      @input="refresh"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';
import {
  generateEquipmentBasicInformationArrangement,
  generateEquipmentResetInformationArrangement,
  generateEquipmentExtraInformationArrangement,
} from '~/application/services/equipment/equipmentArrangementService';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  basicInformation: EquipmentInformationArrangement;
  resetInformation: EquipmentInformationArrangement;
  extraInformation: EquipmentInformationArrangement;
  loading: boolean;
  swapDialog: boolean;
  swapHero1: Hero;
  swapHero2: Hero;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      basicInformation: new EquipmentInformationArrangement(),
      resetInformation: new EquipmentInformationArrangement(),
      extraInformation: new EquipmentInformationArrangement(),
      loading: true,
      swapDialog: false,
      swapHero1: new Hero(),
      swapHero2: new Hero(),
    };
  },
  created(): void {
    this.refresh();
  },
  methods: {
    refresh(): void {
      this.loading = true;
      this.swapDialog = false;
      const heroList = this.$store.getters['hero/baseHeroList'](this.playerId);
      this.basicInformation = generateEquipmentBasicInformationArrangement(heroList);
      this.resetInformation = generateEquipmentResetInformationArrangement(heroList);
      this.extraInformation = generateEquipmentExtraInformationArrangement(heroList);
      setTimeout(() => {
        this.loading = false;
      }, 50);
    },
    swap(hero: Hero, possibleHero: Hero): void {
      this.swapHero1 = hero;
      this.swapHero2 = possibleHero;
      this.swapDialog = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
