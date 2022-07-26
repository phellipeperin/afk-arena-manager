<template>
  <article>
    <hero-list
      :player-id="$store.state.user.user.id"
      :group-id="group.id"
      type="OBJECTIVE"
      @select="openHeroDialog"
    />

    <hero-player-dialog
      v-model="dialogOpen"
      :group-id="group.id"
      simple
    />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Group from '~/application/domain/group/group';

interface ComponentData {
  dialogOpen: boolean;
}

export default Vue.extend({
  props: {
    group: { type: Group, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
    };
  },
  methods: {
    openHeroDialog(): void {
      if (this.isAdmin) {
        this.dialogOpen = true;
      }
    },
  },
});
</script>

<style scoped lang="scss">

</style>
