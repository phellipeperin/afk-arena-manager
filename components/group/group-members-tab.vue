<template>
  <article>
    <ui-card-skeleton-loader v-if="loading" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Group from '~/application/domain/group/group';
import User from '~/application/domain/user/user';

interface ComponentData {
  members: Array<User>;
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
      loading: true,
    };
  },
  async created(): Promise<void> {
    for (const member of this.group.members) {
      const userDocRef = this.$fire.firestore.collection('users').doc(member.id);
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        const userDocData = userDoc.data() || {};
        const user = new User();
        user.id = userDoc.id;
        user.email = userDocData.email;
        user.systemInfo = userDocData.systemInfo;
        this.members.push(user);
      }
    }
    this.loading = false;
  },
  methods: {
  },
});
</script>

<style scoped lang="scss">

</style>
