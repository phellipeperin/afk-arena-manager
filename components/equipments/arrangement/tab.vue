<template>
  <section>
    <ui-card-skeleton-loader v-if="loading" />
    <section
      v-else
      class="progress-table"
    >
      <ui-no-result
        v-if="!basicInformation.list.length && !priorityInformation.list.length && !resetInformation.list.length && !extraInformation.list.length"
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
            />
          </v-row>
        </article>
        <article v-if="priorityInformation.list.length">
          <ui-sub-header text="Priority Information" />
          <v-row class="mb-6">
            <equipments-arrangement-hero
              v-for="heroInfo in priorityInformation.list"
              :key="heroInfo.hero.id"
              :info="heroInfo"
              show-priority
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
            />
          </v-row>
        </article>
      </v-container>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';
import {
  generateEquipmentBasicInformationArrangement,
  generateEquipmentPriorityInformationArrangement,
  generateEquipmentResetInformationArrangement,
  generateEquipmentExtraInformationArrangement,
} from '~/application/services/equipment/equipmentArrangementService';

interface ComponentData {
  basicInformation: EquipmentInformationArrangement;
  priorityInformation: EquipmentInformationArrangement;
  resetInformation: EquipmentInformationArrangement;
  extraInformation: EquipmentInformationArrangement;
  loading: boolean;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      basicInformation: new EquipmentInformationArrangement(),
      priorityInformation: new EquipmentInformationArrangement(),
      resetInformation: new EquipmentInformationArrangement(),
      extraInformation: new EquipmentInformationArrangement(),
      loading: true,
    };
  },
  created(): void {
    const heroList = this.$store.getters['hero/baseHeroList'](this.playerId);
    this.basicInformation = generateEquipmentBasicInformationArrangement(heroList);
    this.priorityInformation = generateEquipmentPriorityInformationArrangement(heroList);
    this.resetInformation = generateEquipmentResetInformationArrangement(heroList);
    this.extraInformation = generateEquipmentExtraInformationArrangement(heroList);
    this.loading = false;
  },
});
</script>

<style scoped lang="scss">

</style>
