<template>
  <article>
    <ui-no-result v-if="!list.length" />

    <v-container>
      <v-row>
        <v-col
          v-for="member in list"
          :key="member.id"
          cols="12"
          sm="6"
          xl="4"
        >
          <group-member-list-item
            :member="member"
            :is-admin="isAdmin"
            @changeRole="(newRole) => changeRole(member, newRole)"
            @remove="() => remove(member)"
            @leave="() => leave(member)"
          />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import GroupMember, { GroupMemberUser, GroupMemberRole } from '~/application/domain/group/groupMember';
import Group from '~/application/domain/group/group';

export default Vue.extend({
  props: {
    list: { type: Array, required: true },
    groupId: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  methods: {
    async leave(member: GroupMemberUser): Promise<void> {
      await this.removeFromDatabase(member);

      const newGroupDataList = this.$store.state.group.list.filter((elem: Group) => elem.id !== this.groupId);
      this.$store.commit('group/SET_LIST', newGroupDataList);
      const newUserGroupList = this.$store.state.user.user.groups.filter((elem: string) => elem !== this.groupId);
      this.$store.commit('user/SET_GROUPS', newUserGroupList);

      this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Left the group successfully');
      this.$nuxt.$router.push('/profile/groups/list');
    },
    async remove(member: GroupMemberUser): Promise<void> {
      await this.removeFromDatabase(member);
      this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Player removed successfully');
      this.$emit('removeSuccess');
    },
    async removeFromDatabase(member: GroupMemberUser): Promise<void> {
      const docRef = await this.$fire.firestore.collection('groups').doc(this.groupId);
      const doc = await docRef.get();
      if (doc.exists) {
        const data = doc.data() || {};
        data.members = data.members.filter((elem: GroupMember) => elem.id !== member.id);
        if (data.members.length) {
          await docRef.update(data);
        } else {
          await docRef.delete();
        }
      }

      const userDocRef = this.$fire.firestore.collection('users').doc(member.id);
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data() || {};
        userData.groups = userData.groups.filter((elem: string) => elem !== this.groupId);
        await userDocRef.update(userData);
      }
    },
    async changeRole(member: GroupMemberUser, newRole: GroupMemberRole): Promise<void> {
      const docRef = await this.$fire.firestore.collection('groups').doc(this.groupId);
      const doc = await docRef.get();
      if (doc.exists) {
        const data = doc.data();
        const index = data?.members.findIndex((elem: GroupMember) => elem.id === member.id) || -1;
        if (data && index !== -1) {
          data.members[index].role = newRole;
          await docRef.update(data as any);
          this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Role updated successfully');
        }
      }
    },
  },
});
</script>

<style scoped lang="scss">
</style>
