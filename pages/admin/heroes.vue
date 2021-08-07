<template>
  <div>
    <ui-page-header
      title="Heroes"
      :subtitle="$vuetify.breakpoint.smAndUp ? pageSubtitle : ''"
    >
      <v-btn
        raised
        color="primary"
        @click.stop="createNewHero"
      >
        Create New Hero
      </v-btn>
      <hero-admin-dialog v-model="dialogOpen" />
    </ui-page-header>

    <hero-list
      @select="openHeroDialog"
      @update="updatePageSubtitle"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  dialogOpen: boolean;
  pageSubtitle: string;
}

export default Vue.extend({
  meta: {
    role: 'ADMIN',
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
      pageSubtitle: '',
    };
  },
  methods: {
    createNewHero(): void {
      this.$store.commit('hero/SET_HERO', new Hero());
      this.dialogOpen = true;
    },
    openHeroDialog(): void {
      this.dialogOpen = true;
    },
    updatePageSubtitle(total: number): void {
      this.pageSubtitle = `${total} heroes registered`;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
