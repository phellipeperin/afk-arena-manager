<template>
  <v-container fluid>
    <v-row v-if="!$store.state.compare.onCompare">
      <v-col cols="12">
        <slot name="user" />
      </v-col>
    </v-row>
    <v-row v-if="$store.state.compare.onCompare">
      <v-col
        v-if="$vuetify.breakpoint.mdAndDown"
        cols="12"
        class="d-flex justify-center"
      >
        <v-btn-toggle
          v-model="userVisibleOnMobile"
          mandatory
        >
          <v-btn>
            <ui-avatar
              :photo-url="$store.state.user.user.systemInfo.photoUrl"
              size="32"
            />
            <p class="ml-2 mb-0">
              Me
            </p>
          </v-btn>
          <v-btn
            v-for="(friend, index) in $store.state.compare.friends"
            :key="`${friend.id}_${index}_menu`"
          >
            <ui-avatar
              v-if="friend.id"
              :photo-url="friend.systemInfo.photoUrl"
              size="32"
            />
            <p class="ml-2 mb-0">
              {{ friend.id ? friend.systemInfo.nickname : `Friend ${index + 1}` }}
            </p>
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col
        v-show="isUserVisible(0)"
        cols="12"
        lg="4"
      >
        <ui-card title="Me">
          <template #toolbar-info>
            <ui-avatar
              :photo-url="$store.state.user.user.systemInfo.photoUrl"
              size="32"
            />
          </template>

          <section class="px-2 py-4">
            <slot name="user" />
          </section>
        </ui-card>
      </v-col>
      <v-col
        v-for="(friend, index) in $store.state.compare.friends"
        v-show="isUserVisible(index + 1)"
        :key="`${friend.id}_${index}`"
        cols="12"
        lg="4"
      >
        <ui-card :title="friend.id ? friend.systemInfo.nickname : 'Select Friend'">
          <template #toolbar-info>
            <ui-avatar
              v-if="friend.id"
              :photo-url="friend.systemInfo.photoUrl"
              size="32"
            />
            <v-btn
              v-if="friend.id"
              icon
              small
              @click="removeFriend(index)"
            >
              <v-icon
                small
                dark
              >
                mdi-close
              </v-icon>
            </v-btn>
          </template>

          <div
            v-if="!friend.id"
            class="px-4 pt-2"
          >
            <v-select
              :value="friend.id"
              :items="friendItemList"
              item-text="label"
              item-value="value"
              label="Please Select"
              @input="(value) => selectFriend(index, value)"
            />
          </div>
          <section
            v-else
            class="px-2 py-4"
          >
            <slot
              name="friend"
              :friend="friend"
            />
          </section>
        </ui-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

interface ComponentData {
  userVisibleOnMobile: number;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      userVisibleOnMobile: 0,
    };
  },
  computed: {
    friendItemList() {
      return this.$store.state.friend.list.filter((elem: User) => this.$store.state.compare.friends.findIndex((friendElem: User) => friendElem.id === elem.id) === -1).map((elem: User) => ({ value: elem.id, label: elem.systemInfo.nickname }));
    },
  },
  methods: {
    isUserVisible(index: number): boolean {
      return this.$vuetify.breakpoint.lgAndUp || this.userVisibleOnMobile === index;
    },
    selectFriend(index: number, id: string): void {
      this.$store.commit('compare/SET_FRIEND', { index, friend: this.$store.state.friend.list.find((elem: User) => elem.id === id) || new User() });
    },
    removeFriend(index: number): void {
      this.$store.commit('compare/SET_FRIEND', { index, friend: new User() });
    },
  },
});
</script>

<style scoped lang="scss">

</style>
