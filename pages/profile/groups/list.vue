<template>
  <section>
    <ui-page-help-info>
      <ui-sub-header text="Groups" />
      <p class="text-body-2">
        Groups are an easy way of sharing information with other people (objectives, for example). It can be used to facilitate guild management.
      </p>
    </ui-page-help-info>

    <ui-content-container>
      <group-list />
    </ui-content-container>

    <group-add-dialog v-model="dialogAddOpen" />
    <group-join-dialog v-model="dialogJoinOpen" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  dialogAddOpen: boolean;
  dialogJoinOpen: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      dialogAddOpen: false,
      dialogJoinOpen: false,
    };
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Groups',
      helpInfoEnabled: true,
      extraActions: [{
        icon: 'mdi-plus',
        callback: this.createGroup,
      }, {
        icon: 'mdi-link-variant',
        callback: this.joinGroup,
      }],
    });
  },
  methods: {
    createGroup(): void {
      this.dialogAddOpen = true;
    },
    joinGroup(): void {
      this.dialogJoinOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
