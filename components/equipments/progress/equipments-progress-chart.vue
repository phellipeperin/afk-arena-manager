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
  , {
  EquipmentInformationProgressEquipItemValueItem,
  EquipmentInformationProgressEquipItemValues
} from '~/application/domain/equipment/equipmentInformationProgressEquipItem';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';

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
        colors: [StatisticColor.NONE, StatisticColor.ELITE, StatisticColor.LEGENDARY, StatisticColor.MYTHIC, StatisticColor.ASCENDED, StatisticColor.MAX],
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
          events: {
            dataPointSelection: (_event: any, _chartContext: any, config: any) => {
              if (config.dataPointIndex >= 0 && config.dataPointIndex <= 3) {
                const equipTypeData = this.data.items[config.dataPointIndex] as EquipmentInformationProgressEquipItem;
                let seriesData: EquipmentInformationProgressEquipItemValueItem = { amount: 0, heroes: [] };
                switch (config.seriesIndex) {
                  case 0:
                    seriesData = equipTypeData.values.notAcquired;
                    break;
                  case 1:
                    seriesData = equipTypeData.values.t0;
                    break;
                  case 2:
                    seriesData = equipTypeData.values.t1;
                    break;
                  case 3:
                    seriesData = equipTypeData.values.t2;
                    break;
                  case 4:
                    seriesData = equipTypeData.values.t3;
                    break;
                  case 5:
                    seriesData = equipTypeData.values.t4;
                    break;
                }

                if (seriesData.heroes.length) {
                  this.$emit('showList', seriesData.heroes);
                }
              }
            },
          },
        },
        dataLabels: {
          style: {
            fontSize: '9px',
            fontFamily: 'Source Sans Pro, sans-serif',
          },
        },
        tooltip: {
          marker: false,
          theme: 'dark',
          onDatasetHover: {
            highlightDataSeries: true,
          },
        },
        yaxis: {
          show: false,
          showAlways: false,
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '9px',
              fontFamily: 'Source Sans Pro, sans-serif',
              colors: ['white', 'white', 'white', 'white', 'white'],
            },
          },
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
    }, {
      name: 'T4',
      data: [0, 0, 0, 0, 0],
    }];

    this.data?.items.forEach((item: EquipmentInformationProgressEquipItem) => {
      const index = this.getIndexByEquipType(item.equipType);
      if (index !== -1) {
        this.series[0].data[index] = item.values.notAcquired.amount;
        this.series[1].data[index] = item.values.t0.amount;
        this.series[2].data[index] = item.values.t1.amount;
        this.series[3].data[index] = item.values.t2.amount;
        this.series[4].data[index] = item.values.t3.amount;
        this.series[5].data[index] = item.values.t4.amount;
      }

      this.series[0].data[4] += item.values.notAcquired.amount;
      this.series[1].data[4] += item.values.t0.amount;
      this.series[2].data[4] += item.values.t1.amount;
      this.series[3].data[4] += item.values.t2.amount;
      this.series[4].data[4] += item.values.t3.amount;
      this.series[5].data[4] += item.values.t4.amount;
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
