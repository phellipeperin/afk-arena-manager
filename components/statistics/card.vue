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
          md="4"
          :lg="onCompare ? 12 : 4"
        >
          <v-row no-gutters>
            <v-col
              v-for="chart in chartList"
              cols="12"
            >
              <statistics-chart-donut
                v-if="chart.type === 'DONUT'"
                :data="chart.data"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="8"
          :lg="onCompare ? 12 : 8"
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
