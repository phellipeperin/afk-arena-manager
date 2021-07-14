<template>
  <div class="d-flex full-width">
    <v-row
      v-if="!$store.state.friend.list.length"
      class="mt-4"
    >
      <v-col
        cols="12"
        sm="4"
        offset-sm="4"
      >
        <ui-card class="text-center py-6">
          <span class="text-h6">No Results</span>
        </ui-card>
      </v-col>
    </v-row>

    <transition-group
      name="fade"
      class="d-flex flex-wrap justify-space-around"
    >
      <friend-list-item
        v-for="friend in $store.state.friend.list"
        :key="friend.id"
        :friend="friend"
      />
<!--        @remove="() => remove(friend)"-->
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

export default Vue.extend({
  methods: {
    remove(friend: User): void {
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
