<template>
  <section>
    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
      Information
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 1">
      Members
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 2">
      Objectives
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Firebase from 'firebase';
import Group from '~/application/domain/group/group';

interface ComponentData {
  group: Group;
  isAdmin: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      group: new Group(),
      isAdmin: false,
    };
  },
  async created(): Promise<void> {
    this.group = this.$store.state.group.list.find((group: Group) => group.id === this.$route.params.id);
    if (!this.group || !this.group.id) {
      const groupDocRef = Firebase.firestore().collection('groups').doc(this.$route.params.id);
      const groupDoc = await groupDocRef.get();
      if (groupDoc.exists) {
        const groupData = groupDoc.data() || {};
        this.group = new Group(groupDoc.id, groupData.name, groupData.image);
      }
      // TODO load
    }
    this.$store.commit('system/SET_PAGE_STATE', {
      title: `(Group) ${this.group.name}`,
      tabs: ['Information', 'Members', 'Objective'],
    });
  },
  methods: {
    finish(): void {
      this.$nuxt.$router.push('/profile/groups/list');
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
