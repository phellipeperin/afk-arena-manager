<template>
  <section>
    <ui-content-container :key="containerKey">
      <objectives-list
        :player-id="$store.state.user.user.id"
        :group-id="groupIdList[$store.state.system.pageState.selectedTab]"
      />
    </ui-content-container>

    <v-btn
      v-if="$store.state.system.pageState.selectedTab === 0"
      fab
      right
      bottom
      large
      color="accent"
      class="fab-button"
      @click="editObjective"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  groupIdList: Array<string>;
  containerKey: number;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      groupIdList: ['personal'],
      containerKey: new Date().getTime(),
    };
  },
  watch: {
    '$store.state.system.pageState.selectedTab': {
      handler(): void {
        this.containerKey = new Date().getTime();
      },
    },
  },
  created(): void {
    const tabs = ['Personal'];
    for (const group of this.$store.state.group.list) {
      this.groupIdList.push(group.id);
      tabs.push(group.name);
    }
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Objectives',
      tabs,
    });
  },
  methods: {
    editObjective(): void {
      const selectedTab = this.$store.state.system.pageState.selectedTab;
      this.$nuxt.$router.push(`/player/objectives/${this.groupIdList[selectedTab]}`);
    },
  },
});
</script>

<style scoped lang="scss">
.fab-button {
  position: fixed;
  right: 24px;
  bottom: 24px;
}
</style>
