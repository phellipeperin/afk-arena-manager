<template>
  <div>
    <ui-page-header title="Statistics">
      <app-compare-buttons
        :on-compare="onCompare"
        @update="setCompare"
      />
    </ui-page-header>

    <app-compare-container
      :on-compare="onCompare"
      @changeFriendOne="changeFriendOne"
      @changeFriendTwo="changeFriendTwo"
    >
      <template #fallback>
        <statistics-container
          show-filter
          :player-id="$store.state.user.user.id"
        />
      </template>

      <template #user>
        <statistics-container
          on-compare
          show-filter
          :player-id="$store.state.user.user.id"
        />
      </template>

      <template #friend-one>
        <statistics-container
          on-compare
          :player-id="friendOneId"
        />
      </template>

      <template #friend-two>
        <statistics-container
          on-compare
          :player-id="friendOneTwo"
        />
      </template>
    </app-compare-container>
  </div>
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
