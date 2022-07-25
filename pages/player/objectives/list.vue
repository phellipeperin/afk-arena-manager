<template>
  <section>
    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
      <objectives-list
        :player-id="$store.state.user.user.id"
        :group-id="groupIdList[0]"
      />
    </ui-content-container>

    <v-btn
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
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      groupIdList: ['personal'],
    };
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Objectives',
      tabs: ['Personal'],
    });
    // TODO add list of group to tabs and to this.groupIdList
  },
  methods: {
    editObjective(): void {
      const selectedTab = this.$store.state.system.pageState.selectedTab;
      this.$nuxt.$router.push(`/player/objectives/${selectedTab ? 'ID' : 'personal'}`);
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
