<template>
  <div>
    <ui-page-header
      title="Snapshots"
      :subtitle="$vuetify.breakpoint.smAndUp ? 'Compare your Current Progress with Past Snapshots' : ''"
    >
      <v-btn
        raised
        color="primary"
        @click.stop="createNewSnapshot"
      >
        Create New Snapshot
      </v-btn>
      <snapshot-dialog v-model="dialogOpen" />
    </ui-page-header>

    <snapshot-container @edit="edit" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Snapshot from '~/application/domain/snapshot/snapshot';

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
    createNewSnapshot(): void {
      this.$store.commit('snapshot/SET_SNAPSHOT', new Snapshot());
      this.dialogOpen = true;
    },
    edit(snapshot: Snapshot): void {
      this.$store.commit('snapshot/SET_SNAPSHOT', snapshot);
      this.dialogOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
