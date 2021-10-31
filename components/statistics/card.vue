<template>
  <ui-card
    :title="title"
    :outlined="onCompare"
    :elevation="onCompare ? '0' : undefined"
    :header-elevation="onCompare ? '0' : undefined"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          :lg="onCompare ? 12 : 6"
        >
          <v-row no-gutters>
            <v-col
              v-for="chart in chartList"
              :key="chart.title"
              cols="12"
              sm="6"
            >
              <ui-sub-header :text="chart.title" />
              <statistics-chart-donut
                v-if="chart.type === 'DONUT'"
                :data="chart.data"
              />
              <statistics-chart-radial
                v-if="chart.type === 'RADIAL'"
                :data="chart.data"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          :lg="onCompare ? 12 : 6"
        >
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </ui-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: { type: String, required: false, default: '' },
    chartList: { type: Array, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
