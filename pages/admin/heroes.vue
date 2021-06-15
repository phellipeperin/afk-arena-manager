<template>
  <div>
    <ui-page-header
      title="Heroes"
    >
      <v-btn
        raised
        color="primary"
        @click.stop="dialogOpen = true"
      >
        Create New Hero
      </v-btn>
      <hero-admin-dialog v-model="dialogOpen" />
    </ui-page-header>
    <!--    <v-sheet-->
    <!--      shaped-->
    <!--      color="white"-->
    <!--      elevation="1"-->
    <!--      height="140"-->
    <!--      width="140"-->
    <!--    />-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  dialogOpen: boolean;
}

export default Vue.extend({
  meta: {
    role: 'ADMIN',
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
    };
  },
});
</script>

<style scoped lang="scss">

</style>
