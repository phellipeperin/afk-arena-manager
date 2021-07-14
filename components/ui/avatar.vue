<template>
  <v-avatar
    color="primary"
    :size="size"
  >
    <img
      v-if="photoUrl"
      :src="photoUrl"
      alt="Avatar"
    >
    <span
      v-else
      class="white--text"
    >
      <v-icon
        dark
        :size="size / 2"
      >
        mdi-account-circle
      </v-icon>
    </span>
  </v-avatar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    photoUrl: { type: String, required: false, default: '' },
    size: { type: String, required: false, default: '80' },
  },
});
</script>

<style scoped lang="scss">

</style>
