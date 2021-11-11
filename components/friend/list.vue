<template>
  <article>
    <ui-no-result v-if="!$store.state.friend.list.length" />

    <v-container>
      <v-row>
        <v-col
          v-for="friend in $store.state.friend.list"
          :key="friend.id"
          cols="12"
          sm="4"
        >
          <friend-list-item
            :friend="friend"
            @remove="() => remove(friend)"
          />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

export default Vue.extend({
  methods: {
    async remove(friend: User): Promise<void> {
      try {
        const newFriendList = this.$store.state.user.user.friends.filter((elem: string) => elem !== friend.id);
        const docRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
        const data = {
          friends: JSON.parse(JSON.stringify(newFriendList)),
        };
        await docRef.update(data);
        this.$store.commit('user/SET_FRIENDS', newFriendList);

        const newFriendDataList = this.$store.state.friend.list.filter((elem: User) => elem.id !== friend.id);
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
</style>
