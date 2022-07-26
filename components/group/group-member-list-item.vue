<template>
  <v-banner>
    <ui-avatar
      :photo-url="member.user.systemInfo.photoUrl"
      size="42"
    />
    <span class="text-h6 ml-2">{{ member.user.systemInfo.nickname }}</span>

    <template #actions>
      <v-select
        :value="member.role"
        :items="roleItemList"
        :disabled="!isAdmin || isLoggedPlayer"
        hide-details
        item-text="label"
        item-value="value"
        label="Role"
        class="select-role"
        @input="(value) => changeRole(value)"
      />

      <v-btn
        v-if="isAdmin || isLoggedPlayer"
        small
        text
        color="error"
        @click="remove"
      >
        {{ isLoggedPlayer ? 'Leave' : 'Remove' }}
      </v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import Vue from 'vue';
import { GroupMemberRole, GroupMemberUser } from '~/application/domain/group/groupMember';

export default Vue.extend({
  props: {
    member: { type: Object, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  computed: {
    roleItemList() {
      return [
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Member', value: 'MEMBER' },
      ];
    },
    isLoggedPlayer(): boolean {
      return (this.member as GroupMemberUser).id === this.$store.state.user.user.id;
    },
  },
  methods: {
    remove(): void {
      this.$emit(this.isLoggedPlayer ? 'leave' : 'remove');
    },
    changeRole(newRole: GroupMemberRole): void {
      this.$emit('changeRole', newRole);
    },
  },
});
</script>

<style scoped lang="scss">
.select-role {
  max-width: 160px;
}
</style>
