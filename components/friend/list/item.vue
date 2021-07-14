<template>
  <v-sheet
    shaped
    :elevation="2"
    height="120"
    width="260"
    class="ma-2"
  >
    <span>{{ friend.gameInfo.nickname }}</span>
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
    select(): void {
      this.$emit('select');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
