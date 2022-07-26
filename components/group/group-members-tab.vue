<template>
  <article>
    <ui-card-skeleton-loader v-if="loading" />
    <group-member-list
      v-if="!loading"
      :list="members"
      :is-admin="isAdmin"
      :group-id="group.id"
      @removeSuccess="refreshPlayerList"
    />

    <v-container v-if="!loading && isAdmin">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          offset-sm="3"
          offset-md="4"
        >
          <v-btn
            v-if="isAdmin && !addDialogOpen"
            block
            color="accent"
            class="mt-4"
            @click="addMember"
          >
            Add Member
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <group-member-add-dialog
      v-model="addDialogOpen"
      :group-id="group.id"
      @addSuccess="refreshPlayerList"
    />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Group from '~/application/domain/group/group';
import User from '~/application/domain/user/user';
import { GroupMemberUser } from '~/application/domain/group/groupMember';

interface ComponentData {
  members: Array<GroupMemberUser>;
  addDialogOpen: boolean;
  loading: boolean;
}

export default Vue.extend({
  props: {
    group: { type: Group, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      members: [],
      addDialogOpen: false,
      loading: true,
    };
  },
  async created(): Promise<void> {
    await this.refreshPlayerList();
  },
  methods: {
    addMember(): void {
      this.addDialogOpen = true;
    },
    async refreshPlayerList(): Promise<void> {
      this.loading = true;
      this.members = [];
      const groupDocRef = this.$fire.firestore.collection('groups').doc(this.group.id);
      const groupDoc = await groupDocRef.get();
      if (groupDoc.exists) {
        const groupData = groupDoc.data() || {};
        for (const member of groupData.members) {
          const memberDocRef = this.$fire.firestore.collection('users').doc(member.id);
          const memberDoc = await memberDocRef.get();
          if (memberDoc.exists) {
            const memberDocData = memberDoc.data() || {};
            const user = new User();
            user.id = memberDoc.id;
            user.email = memberDocData.email;
            user.systemInfo = memberDocData.systemInfo;
            this.members.push({
              id: member.id,
              role: member.role,
              user,
            });
          }
        }
      }
      this.loading = false;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
