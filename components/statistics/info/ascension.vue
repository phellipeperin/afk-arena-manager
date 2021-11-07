<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        :lg="onCompare ? '12' : '3'"
      >
        <ui-info-title text="Copies Needed">
          <b>{{ info.totalNormalCopiesNeeded + info.totalCelepogeanCopiesNeeded }}</b> Total<br>
          - <b>{{ info.totalNormalCopiesNeeded }}</b> Normal<br>
          - <b>{{ info.totalCelepogeanCopiesNeeded }}</b> Celepogean
        </ui-info-title>
        <ui-info-title text="Sacs Needed">
          <b>{{ info.elitePlusSacNeeded }}</b> Elite+
          (or <b>{{ info.elitePlusSacNeeded * 18 }}</b> Rare)
        </ui-info-title>
      </v-col>
      <v-col
        cols="12"
        :lg="onCompare ? '12' : '9'"
        class="text-center"
      >
        <v-btn
          v-show="onCompare"
          small
          color="primary"
          @click="showCopies = !showCopies"
        >
          {{ showCopies ? 'Hide Missing Copies' : 'Show Missing Copies' }}
        </v-btn>
        <div v-show="!onCompare || showCopies">
          <transition-group
            appear
            name="fade"
            class="d-flex flex-wrap"
          >
            <hero-list-statistic-item
              v-for="item in info.copiesNormalNeeded"
              :key="item.hero.id"
              :hero="item.hero"
              :amount="item.amount"
            />
          </transition-group>
          <transition-group
            appear
            name="fade"
            class="d-flex flex-wrap"
          >
            <hero-list-statistic-item
              v-for="item in info.copiesCelepogeanNeeded"
              :key="item.hero.id"
              :hero="item.hero"
              :amount="item.amount"
            />
          </transition-group>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';

interface ComponentData {
  showCopies: boolean;
}

export default Vue.extend({
  props: {
    info: { type: StatisticAscensionInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      showCopies: false,
    };
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
