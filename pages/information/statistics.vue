<template>
  <section>
<!--      <template #explanation>-->
<!--        <h6 class="text-h6">-->
<!--          Progress Charts-->
<!--        </h6>-->
<!--        <p class="text-body-2">-->
<!--          Progress charts show how much the percentage of resources you already used to fully maximize that category.-->
<!--        </p>-->
<!--        <p class="text-body-2">-->
<!--          For example, let's suppose the copies, to take a non-celepogean hero to ascended is necessary 8 copies. If you already acquired 6 of the hero, you have 75% of the copies. The value on the chart is the average of this calculation for all the heroes.-->
<!--        </p>-->
<!--        <p class="text-body-2">-->
<!--          Another important example is that even if you have no heroes +40, you probably have progress anyway in this regard, because bringing a hero to +30 consumes the same resource.-->
<!--        </p>-->
<!--      </template>-->

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
      <statistics-container :player-id="$store.state.user.user.id" />
    </ui-content-container>

<!--    <app-compare-container-->
<!--      :on-compare="onCompare"-->
<!--      @changeFriendOne="changeFriendOne"-->
<!--      @changeFriendTwo="changeFriendTwo"-->
<!--    >-->
<!--      <template #fallback>-->
<!--        <statistics-container-->
<!--          show-filter-->
<!--          :player-id="$store.state.user.user.id"-->
<!--        />-->
<!--      </template>-->

<!--      <template #user>-->
<!--        <statistics-container-->
<!--          on-compare-->
<!--          show-filter-->
<!--          :player-id="$store.state.user.user.id"-->
<!--        />-->
<!--      </template>-->

<!--      <template #friend-one>-->
<!--        <statistics-container-->
<!--          on-compare-->
<!--          :player-id="friendOneId"-->
<!--        />-->
<!--      </template>-->

<!--      <template #friend-two>-->
<!--        <statistics-container-->
<!--          on-compare-->
<!--          :player-id="friendOneTwo"-->
<!--        />-->
<!--      </template>-->
<!--    </app-compare-container>-->
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

Vue.use(VueApexCharts);
Vue.component('Apexchart', VueApexCharts);

interface ComponentData {
  onCompare: boolean;
  friendOneId: string;
  friendOneTwo: string;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      onCompare: false,
      friendOneId: '',
      friendOneTwo: '',
    };
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Statistics',
      heroFilterEnabled: true,
      compareEnabled: true,
      tabs: ['Ascension', 'Signature Item', 'Furniture', 'Engrave', 'Equipment', 'Elder Tree', 'Artifact'],
    });
  },
  methods: {
    setCompare(state: boolean): void {
      this.onCompare = state;
    },
    changeFriendOne(id: string): void {
      this.friendOneId = id;
    },
    changeFriendTwo(id: string): void {
      this.friendOneTwo = id;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
