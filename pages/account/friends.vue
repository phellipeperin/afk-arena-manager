<template>
  <section>
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
