<template>
  <section>
    <ui-content-container>
      <hero-list
        :player-id="$store.state.user.user.id"
        :group-id="groupId"
        type="OBJECTIVE"
        @select="openHeroDialog"
      />
    </ui-content-container>

    <hero-player-dialog
      v-model="dialogOpen"
      :group-id="groupId"
      simple
    />
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
  computed: {
    groupId(): string {
      return this.$route.params.id || 'personal';
    },
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Edit Objective',
      extraActions: [{
        icon: 'mdi-check',
        callback: this.finish,
      }],
    });
  },
  methods: {
    finish(): void {
      this.$nuxt.$router.push('/player/objectives/list');
    },
    openHeroDialog(): void {
      this.dialogOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
