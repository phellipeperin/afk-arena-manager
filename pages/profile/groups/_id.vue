<template>
  <section>
    <ui-content-container v-if="$store.state.system.pageState.selectedTab === 0">
      <group-info-tab
        :group="group"
        :is-admin="isAdmin"
      />
    </ui-content-container>

    <ui-content-container v-if="$store.state.system.pageState.selectedTab === 1">
      <group-members-tab
        :group="group"
        :is-admin="isAdmin"
      />
    </ui-content-container>

    <ui-content-container v-if="$store.state.system.pageState.selectedTab === 2">
      <group-objective-tab
        :group="group"
        :is-admin="isAdmin"
      />
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Group from '~/application/domain/group/group';
import GroupMember from '~/application/domain/group/groupMember';

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
    this.group = this.$store.state.group.list.filter((elem: Group) => elem.id === this.$route.params.id);
    if (!this.group || !this.group.id || !this.group.members?.length) {
      const groupDocRef = this.$fire.firestore.collection('groups').doc(this.$route.params.id);
      const groupDoc = await groupDocRef.get();
      if (groupDoc.exists) {
        const groupData = groupDoc.data() || {};
        console.log(groupData);
        this.group = new Group(groupDoc.id, groupData.name, groupData.image, groupData.members);
      }
    }

    const currentLoggedMember = this.group.members.find((elem: GroupMember) => elem.id === this.$store.state.user.user.id);
    console.log(currentLoggedMember);
    this.isAdmin = currentLoggedMember?.role === 'ADMIN';

    this.$store.commit('system/SET_PAGE_STATE', {
      title: `(Group) ${this.group.name}`,
      canGoBack: true,
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
