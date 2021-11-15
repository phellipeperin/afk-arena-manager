<template>
  <section>
    <ui-content-container>
      <hero-list @select="openHeroDialog" />
    </ui-content-container>

    <hero-admin-dialog v-model="dialogOpen" />
  </section>
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
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Heroes',
      extraActions: [{
        icon: 'mdi-plus',
        callback: this.createNewHero,
      }],
    });
  },
  methods: {
    createNewHero(): void {
      this.$store.commit('hero/SET_HERO', new Hero());
      this.dialogOpen = true;
    },
    openHeroDialog(): void {
      this.dialogOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
