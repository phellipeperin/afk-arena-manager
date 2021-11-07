<template>
  <v-container fluid>
    <v-row v-if="onCompare">
      <v-col
        v-if="$vuetify.breakpoint.mdAndDown"
        cols="12"
        class="d-flex justify-center"
      >
        <v-btn-toggle
          v-model="friendVisible"
          mandatory
          shaped
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
          <v-btn>
            <ui-avatar
              v-if="friendOne.id"
              :photo-url="friendOne.systemInfo.photoUrl"
              size="32"
            />
            <p class="ml-2 mb-0">
              {{ friendOne.id ? friendOne.systemInfo.nickname : 'Friend 1' }}
            </p>
          </v-btn>
          <v-btn>
            <ui-avatar
              v-if="friendTwo.id"
              :photo-url="friendTwo.systemInfo.photoUrl"
              size="32"
            />
            <p class="ml-2 mb-0">
              {{ friendTwo.id ? friendTwo.systemInfo.nickname : 'Friend 2' }}
            </p>
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col
        v-if="$vuetify.breakpoint.lgAndUp || friendVisible === 0"
        cols="12"
        lg="4"
      >
        <ui-card
          title="Me"
          class="pb-4"
          :elevation="elevation"
        >
          <template #toolbar-info>
            <ui-avatar
              :photo-url="$store.state.user.user.systemInfo.photoUrl"
              size="32"
            />
          </template>

          <slot name="user" />
        </ui-card>
      </v-col>
      <v-col
        v-if="$vuetify.breakpoint.lgAndUp || friendVisible === 1"
        cols="12"
        lg="4"
      >
        <ui-card
          :title="friendOne.id ? friendOne.systemInfo.nickname : 'Select Friend'"
          :class="friendOne.id ? 'pb-4' : ''"
          :elevation="elevation"
        >
          <template #toolbar-info>
            <ui-avatar
              v-if="friendOne.id"
              :photo-url="friendOne.systemInfo.photoUrl"
              size="32"
            />
            <v-btn
              v-if="friendOne.id"
              icon
              small
              @click="removeFriendOne"
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
            v-if="!friendOne.id"
            class="px-4"
          >
            <v-select
              :value="friendOne.id"
              :items="friendItemList"
              item-text="label"
              item-value="value"
              label="Please Select"
              @input="(value) => selectFriendOne(value)"
            />
          </div>
          <div v-else>
            <slot name="friend-one" />
          </div>
        </ui-card>
      </v-col>
      <v-col
        v-if="$vuetify.breakpoint.lgAndUp || friendVisible === 2"
        cols="12"
        lg="4"
      >
        <ui-card
          :title="friendTwo.id ? friendTwo.systemInfo.nickname : 'Select Friend'"
          :class="friendTwo.id ? 'pb-4' : ''"
        >
          <template #toolbar-info>
            <ui-avatar
              v-if="friendTwo.id"
              :photo-url="friendTwo.systemInfo.photoUrl"
              size="32"
            />
            <v-btn
              v-if="friendTwo.id"
              icon
              small
              @click="removeFriendTwo"
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
            v-if="!friendTwo.id"
            class="px-4"
          >
            <v-select
              :value="friendTwo.id"
              :items="friendItemList"
              item-text="label"
              item-value="value"
              label="Please Select"
              @input="(value) => selectFriendTwo(value)"
            />
          </div>
          <div v-else>
            <slot name="friend-two" />
          </div>
        </ui-card>
      </v-col>
    </v-row>

    <div v-if="!onCompare">
      <slot name="fallback" />
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

interface ComponentData {
  friendVisible: number;
  friendOne: User;
  friendTwo: User;
}

export default Vue.extend({
  props: {
    onCompare: { type: Boolean, required: true },
    elevation: { type: String, required: false, default: '2' },
  },
  data(): ComponentData {
    return {
      friendVisible: 0,
      friendOne: new User(),
      friendTwo: new User(),
    };
  },
  computed: {
    friendItemList() {
      return this.$store.state.friend.list.filter((elem: User) => elem.id !== this.friendOne.id && elem.id !== this.friendTwo.id).map((elem: User) => ({ value: elem.id, label: elem.systemInfo.nickname }));
    },
  },
  methods: {
    selectFriendOne(id: string): void {
      this.friendOne = this.$store.state.friend.list.find((elem: User) => elem.id === id);
      this.$emit('changeFriendOne', id);
    },
    selectFriendTwo(id: string): void {
      this.friendTwo = this.$store.state.friend.list.find((elem: User) => elem.id === id);
      this.$emit('changeFriendTwo', id);
    },
    removeFriendOne(): void {
      this.friendOne = new User();
      this.$emit('changeFriendOne', null);
    },
    removeFriendTwo(): void {
      this.friendTwo = new User();
      this.$emit('changeFriendTwo', null);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
