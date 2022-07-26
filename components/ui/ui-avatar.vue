<template>
  <v-avatar
    :color="photoUrl ? 'transparent' : 'primary'"
    :size="size"
    :rounded="rounded"
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
        {{ fallbackIcon }}
      </v-icon>
    </span>
  </v-avatar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    photoUrl: { type: String, required: false, default: '' },
    fallbackIcon: { type: String, required: false, default: 'mdi-account-circle' },
    size: { type: String, required: false, default: '120' },
    rounded: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
