<template>
  <div class="d-flex full-width">
    <ui-no-result v-if="!$store.state.friend.list.length" />

    <transition-group
      name="fade"
      class="d-flex flex-wrap justify-space-around"
    >
      <friend-list-item
        v-for="friend in $store.state.friend.list"
        :key="friend.id"
        :friend="friend"
        @remove="() => remove(friend)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

export default Vue.extend({
  methods: {
    async remove(friend: User): Promise<void> {
      try {
        const newFriendList = this.$store.state.user.user.friends.filter(elem => elem !== friend.id);
        const docRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
        const data = {
          friends: JSON.parse(JSON.stringify(newFriendList)),
        };
        await docRef.update(data);
        this.$store.commit('user/SET_FRIENDS', newFriendList);

        const newFriendDataList = this.$store.state.friend.list.filter(elem => elem.id !== friend.id);
        this.$store.commit('friend/SET_LIST', newFriendDataList);

        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Friend Removed Successfully');
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: opacity ease .4s .3s;
}
.fade-leave-active {
  transition: opacity ease .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
