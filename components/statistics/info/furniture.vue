<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Furniture Needed">
          <b>{{ info.largeFurnitureNeeded + info.smallFurnitureNeeded + info.hangingFurnitureNeeded }}</b> Total<br>
          - <b>{{ info.largeFurnitureNeeded }}</b> Large<br>
          - <b>{{ info.smallFurnitureNeeded }}</b> Small<br>
          - <b>{{ info.hangingFurnitureNeeded }}</b> Hanging
        </ui-info-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';

export default Vue.extend({
  props: {
    info: { type: StatisticFurnitureInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
