<template>
  <div>
    <ui-page-header
      title="Heroes"
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
import Hero from '~/application/domain/hero/hero';

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
  methods: {
    createNewHero(): void {
      this.$store.commit('hero/SET_HERO', new Hero());
      this.dialogOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
