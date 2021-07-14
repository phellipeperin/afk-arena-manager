<template>
  <v-sheet
    shaped
    :elevation="2"
    height="140"
    width="280"
    class="ma-2 py-2 px-4 d-flex align-center"
  >
    <ui-avatar
      :photo-url="friend.systemInfo.photoUrl"
      size="82"
      class="mr-6"
    />
    <div class="d-flex flex-column">
      <span class="text-h6 mb-2">{{ friend.gameInfo.nickname }}</span>
      <v-chip
        small
        class="mb-1"
      >
        Player <b class="ml-1">Lv. {{ friend.gameInfo.playerLevel }}</b>
      </v-chip>
      <v-chip
        small
        outlined
      >
        Crystal <b class="ml-1">Lv. {{ friend.gameInfo.crystalLevel }}</b>
      </v-chip>
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
