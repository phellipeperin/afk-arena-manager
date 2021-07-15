<template>
  <div>
    <v-row v-if="onCompare">
      <v-col cols="4">
        <ui-card title="Me">
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
        <ui-card title="Select Friend">
          <v-select
            :value="friendOne.id"
            :items="friendItemList"
            item-text="label"
            item-value="value"
            label="Please Select"
          />
        </ui-card>

        <slot name="friend-one" />
      </v-col>
      <v-col cols="4">
        <slot name="friend-two" />
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
});
</script>

<style scoped lang="scss">

</style>
