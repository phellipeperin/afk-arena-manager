<template>
  <div>
    <!--      v-if="data && data.length"-->
    <apexchart
      type="bar"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationProgressEquipItem, { EquipmentInformationProgressItemValues } from '~/application/domain/equipment/equipmentInformationProgressEquipItem';

interface ComponentData {
  options: any;
  series: Array<number>;
}

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgressEquipItem, required: true },
  },
  data(): ComponentData {
    return {
      options: {
        legend: {
          show: false,
        },
        labels: ['Weapon', 'Head', 'Chest', 'Feet'],
        colors: ['red', 'blue', 'green', 'purple', 'yellow'],
        chart: {
          fontFamily: 'Source Sans Pro, sans-serif',
          stacked: true,
          stackType: '100%',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 8,
          },
        },
        yaxis: {
          show: false,
          showAlways: false,
        },
        grid: {
          show: false,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.2,
            stops: [0, 100],
          },
        },
      },
      series: [],
    };
  },
  created(): void {
    this.options.labels = this.labels;
    this.options.colors = this.colors;

    this.series = [{
      name: 'PRODUCT A',
      data: [44, 55, 41, 67],
    }, {
      name: 'PRODUCT B',
      data: [13, 23, 20, 8],
    }, {
      name: 'PRODUCT C',
      data: [11, 17, 15, 15],
    }, {
      name: 'PRODUCT D',
      data: [21, 7, 25, 13],
    }, {
      name: 'PRODUCT E',
      data: [21, 7, 25, 13],
    }];

    // if (this.data && this.data.length) {
    //   this.series = [{
    //     name: 'Not Acquired',
    //     data: [],
    //   }, {
    //     name: 'T0',
    //     data: [],
    //   }, {
    //     name: 'T1',
    //     data: [],
    //   }, {
    //     name: 'T2',
    //     data: [],
    //   }, {
    //     name: 'T3',
    //     data: [],
    //   }];
    // }

    // this.data?.forEach((item) => {
    //   const convertedItem = item as EquipmentInformationProgressItemValues;
    //   this.series[0].push({
    //     name: '',
    //     data: [convertedItem.notAcquired]
    //   });
    // });
  },
});
</script>

