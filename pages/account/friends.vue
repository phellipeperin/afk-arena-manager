<template>
  <section>
    <ui-page-help-info>
      <h6 class="text-h6">
        Add Friend
      </h6>
      <p class="text-body-2">
        To add a friend, the person needs to go for his/her profile page and send you the ID displayed there. With an ID in hands, you just need to add via the add button.
      </p>
    </ui-page-help-info>

    <ui-content-container>
      <friend-list />
    </ui-content-container>

    <friend-dialog-add v-model="dialogOpen" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

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
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Friends',
      helpInfoEnabled: true,
      extraActions: [{
        icon: 'mdi-plus',
        callback: this.addFriend,
      }],
    });
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
