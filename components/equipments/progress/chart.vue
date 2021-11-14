<template>
  <div>
    <apexchart
      type="bar"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';
import EquipmentInformationProgressEquipItem
  from '~/application/domain/equipment/equipmentInformationProgressEquipItem';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';

interface SeriesData {
  name: string;
  data: Array<number>;
}

interface ComponentData {
  options: any;
  series: Array<SeriesData>;
}

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgress, required: true },
  },
  data(): ComponentData {
    return {
      options: {
        legend: {
          show: false,
        },
        labels: ['Weapon', 'Head', 'Chest', 'Feet', 'Total'],
        colors: [StatisticColor.NONE, StatisticColor.ELITE, StatisticColor.LEGENDARY, StatisticColor.MYTHIC, StatisticColor.ASCENDED],
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
          // height: '280px',
        },
        dataLabels: {
          style: {
            fontSize: '9px',
            fontFamily: 'Source Sans Pro, sans-serif',
          },
        },
        tooltip: {
          marker: false,
          onDatasetHover: {
            highlightDataSeries: true,
          },
        },
        plotOptions: {
          bar: {
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
    this.series = [{
      name: 'Not Acquired',
      data: [0, 0, 0, 0, 0],
    }, {
      name: 'T0',
      data: [0, 0, 0, 0, 0],
    }, {
      name: 'T1',
      data: [0, 0, 0, 0, 0],
    }, {
      name: 'T2',
      data: [0, 0, 0, 0, 0],
    }, {
      name: 'T3',
      data: [0, 0, 0, 0, 0],
    }];

    this.data?.items.forEach((item: EquipmentInformationProgressEquipItem) => {
      const index = this.getIndexByEquipType(item.equipType);
      if (index !== -1) {
        this.series[0].data[index] = item.values.notAcquired;
        this.series[1].data[index] = item.values.t0;
        this.series[2].data[index] = item.values.t1;
        this.series[3].data[index] = item.values.t2;
        this.series[4].data[index] = item.values.t3;
      }

      this.series[0].data[4] += item.values.notAcquired;
      this.series[1].data[4] += item.values.t0;
      this.series[2].data[4] += item.values.t1;
      this.series[3].data[4] += item.values.t2;
      this.series[4].data[4] += item.values.t3;
    });
  },
  methods: {
    getIndexByEquipType(equipType: HeroEquipType): number {
      if (equipType === HeroEquipType.Weapon) { return 0; }
      if (equipType === HeroEquipType.Head) { return 1; }
      if (equipType === HeroEquipType.Chest) { return 2; }
      if (equipType === HeroEquipType.Feet) { return 3; }
      return -1;
    },
  },
});
</script>
