<template>
  <section>
    <ui-card-skeleton-loader v-if="loading" />
    <template v-else>
      <ui-content-container v-if="$store.state.system.pageState.selectedTab === 0">
        <summon-info-tab :summon="summon" />
      </ui-content-container>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon from '~/application/domain/summon/summon';

interface ComponentData {
  summon: Summon;
  loading: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      summon: new Summon(),
      loading: true,
    };
  },
  async created(): Promise<void> {
    // this.group = this.$store.state.group.list.filter((elem: Group) => elem.id === this.$route.params.id);
    // if (!this.group || !this.group.id || !this.group.members?.length) {
    //   const groupDocRef = this.$fire.firestore.collection('groups').doc(this.$route.params.id);
    //   const groupDoc = await groupDocRef.get();
    //   if (groupDoc.exists) {
    //     const groupData = groupDoc.data() || {};
    //     this.group = new Group(groupDoc.id, groupData.name, groupData.image, groupData.members);
    //   }
    // }

    this.$store.commit('system/SET_PAGE_STATE', {
      title: `Summons - ${this.summon.label}`,
      canGoBack: true,
      tabs: ['Information'],
    });
    this.loading = false;
  },
});
</script>

<style scoped lang="scss">

</style>
