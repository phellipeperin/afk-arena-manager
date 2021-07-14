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
    remove(friend: User): void {
      // TODO
      // const newFriendList = this.$store.state.
      // this.$store.commit('hero/SET_HERO', hero);
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
