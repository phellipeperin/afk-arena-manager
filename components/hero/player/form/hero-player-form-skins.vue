<template>
  <div>
    <div v-if="skinList.length">
      <ui-sub-header text="Skins" />

      <ui-selector-icon
        :value="$store.state.hero.hero.playerInfo.acquiredSkins"
        :items="skinList"
        icon-size="92"
        active-elevation="12"
        multiple
        @input="(value) => $store.commit('hero/SET_PLAYER_INFO_ACQUIRED_SKINS', value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IconItem } from '~/components/ui/selector/ui-selector-icon.vue';
import HeroSkin from '~/application/domain/hero/hero-skin';

export default Vue.extend({
  computed: {
    skinList(): Array<IconItem> {
      return this.$store.state.hero.hero.gameInfo.skins.map((skin: HeroSkin) => this.createIconItem(skin));
    },
  },
  methods: {
    createIconItem(skin: HeroSkin): IconItem {
      return { id: skin.id, title: skin.name, imageSrc: skin.profileImage };
    },
  },
});
</script>

<style scoped lang="scss">

</style>
