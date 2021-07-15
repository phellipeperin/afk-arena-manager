<template>
  <div>
    <v-row v-if="onCompare">
      <v-col cols="4">
        <ui-card
          title="Me"
          class="pb-4"
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
      <v-col cols="4">
        <ui-card
          :title="friendOne.id ? friendOne.gameInfo.nickname : 'Select Friend'"
          :class="friendOne.id ? 'pb-4' : ''"
        >
          <template #toolbar-info>
            <ui-avatar
              v-if="friendOne.id"
              :photo-url="friendOne.systemInfo.photoUrl"
              size="32"
            />
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
      <v-col cols="4">
        <ui-card
          :title="friendTwo.id ? friendTwo.gameInfo.nickname : 'Select Friend'"
          :class="friendTwo.id ? 'pb-4' : ''"
        >
          <template #toolbar-info>
            <ui-avatar
              v-if="friendTwo.id"
              :photo-url="friendTwo.systemInfo.photoUrl"
              size="32"
            />
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

interface ComponentData {
  friendOne: User;
  friendTwo: User;
}

export default Vue.extend({
  props: {
    onCompare: { type: Boolean, required: true },
  },
  data(): ComponentData {
    return {
      friendOne: new User(),
      friendTwo: new User(),
    };
  },
  computed: {
    friendItemList() {
      return this.$store.state.friend.list.map((elem: User) => ({ value: elem.id, label: elem.gameInfo.nickname }));
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
  },
});
</script>

<style scoped lang="scss">

</style>
