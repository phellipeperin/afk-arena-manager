<template>
  <ui-page-error
    title="Forbidden"
    description="Lord Dreaf had forbidden you from doing what you tried. Please, do not anger our lord !!"
  >
    <v-btn
      large
      color="accent"
      @click="goBack"
    >
      Go Back
    </v-btn>
  </ui-page-error>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'page-error-layout',
  methods: {
    goBack() {
      this.$nuxt.$router.back();
    },
  },
});
</script>

<style scoped lang="scss">

</style>
