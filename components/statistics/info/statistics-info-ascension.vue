<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        :lg="compact ? '12' : '3'"
      >
        <ui-info-title text="Copies Needed">
          <b>{{ info.totalNormalCopiesNeeded + info.totalCelepogeanCopiesNeeded + info.totalAwakenedCopiesNeeded }}</b> Total<br>
          - <b>{{ info.totalNormalCopiesNeeded }}</b> Normal<br>
          - <b>{{ info.totalCelepogeanCopiesNeeded }}</b> Celepogean<br>
          - <b>{{ info.totalAwakenedCopiesNeeded }}</b> Awakened
        </ui-info-title>
        <ui-info-title text="Sacs Needed">
          <div class="d-flex flex-wrap">
            <ui-resource-quantity
              :image-src="sacImage"
              :amount="info.eliteSacNeeded"
            />
          </div>
        </ui-info-title>
      </v-col>
      <v-col
        cols="12"
        :lg="compact ? '12' : '9'"
        class="text-center"
      >
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
        <transition-group
          appear
          name="fade"
          class="d-flex flex-wrap"
        >
          <hero-list-statistic-item
            v-for="item in info.copiesAwakenedNeeded"
            :key="item.hero.id"
            :hero="item.hero"
            :amount="item.amount"
          />
        </transition-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';
import { loadEliteSacImage } from '~/application/services/imageService';

export default Vue.extend({
  props: {
    info: { type: StatisticAscensionInfo, required: true },
    compact: { type: Boolean, required: false, default: false },
  },
  computed: {
    sacImage() {
      return loadEliteSacImage();
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
