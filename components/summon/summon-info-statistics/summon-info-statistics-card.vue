<template>
  <ui-card
    elevation="0"
    :color="color"
    class="px-4 py-2"
  >
    <ui-sub-header :text="label" />
    <p
      v-if="item.total && !hidePercentage"
      class="mb-0"
    >
      <span class="text-caption">Total Summons</span>
      <span class="text-body-1 font-weight-bold">{{ item.total }}</span>
    </p>
    <p
      v-if="item.normalFaction"
      class="mb-0"
    >
      <span class="text-caption">Normal Faction</span>
      <span class="text-body-1 font-weight-bold">{{ item.normalFaction }}</span>
      <span
        v-if="item.total && !hidePercentage"
        class="text-body-2 ml-1"
      >
        ( {{ (item.normalFaction * 100 / item.total).toFixed(2) }}% )
      </span>
      <span
        v-if="item.heroCards"
        class="text-body-2 ml-1"
      >
        ( {{ item.heroCards }} cards )
      </span>
    </p>
    <p
      v-if="item.celepogean"
      class="mb-0"
    >
      <span class="text-caption">Celepogean</span>
      <span class="text-body-1 font-weight-bold">{{ item.celepogean }}</span>
      <span
        v-if="item.total && !hidePercentage"
        class="text-body-2 ml-1"
      >
        ( {{ (item.celepogean * 100 / item.total).toFixed(2) }}% )
      </span>
    </p>
    <p
      v-if="item.awakened"
      class="mb-0"
    >
      <span class="text-caption">Awakened</span>
      <span class="text-body-1 font-weight-bold">{{ item.awakened }}</span>
      <span
        v-if="item.total && !hidePercentage"
        class="text-body-2 ml-1"
      >
        ( {{ (item.awakened * 100 / item.total).toFixed(2) }}% )
      </span>
    </p>
    <p
      v-if="item.furniture"
      class="mb-0"
    >
      <span class="text-caption">Furniture</span>
      <span class="text-body-1 font-weight-bold">{{ item.furniture }}</span>
      <span
        v-if="item.total && !hidePercentage"
        class="text-body-2 ml-1"
      >
        ( {{ (item.furniture * 100 / item.total).toFixed(2) }}% )
      </span>
      <span
        v-if="item.furnitureCards"
        class="text-body-2 ml-1"
      >
        ( {{ item.furnitureCards }} cards )
      </span>
    </p>
  </ui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import SummonStatisticsItem from '~/application/domain/summon/summon-statistics-item';

export default Vue.extend({
  props: {
    item: { type: SummonStatisticsItem, required: true },
    label: { type: String, required: true },
    color: { type: String, required: false, default: '' },
    hidePercentage: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
