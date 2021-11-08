<template>
  <v-sheet
    shaped
    elevation="2"
    height="140"
    width="280"
    class="item ma-2 py-2 px-4 d-flex align-center"
  >
    <ui-avatar
      :photo-url="friend.systemInfo.photoUrl"
      size="82"
      class="mr-6"
    />
    <div class="d-flex flex-column">
      <span class="text-h6 mb-2">{{ friend.systemInfo.nickname }}</span>

      <v-btn
        small
        text
        color="error"
        @click="remove"
      >
        Remove
      </v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

export default Vue.extend({
  props: {
    friend: { type: User, required: true },
  },
  methods: {
    remove(): void {
      this.$emit('remove');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
