<template>
  <div>
    <ui-page-header
      title="Friends"
    >
      <v-btn
        raised
        color="primary"
        @click.stop="addFriend"
      >
        Add Friend
      </v-btn>
      <friend-dialog-add v-model="dialogOpen" />
    </ui-page-header>

<!--    <friend-list />-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

interface ComponentData {
  dialogOpen: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
    };
  },
  methods: {
    addFriend(): void {
      this.dialogOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
