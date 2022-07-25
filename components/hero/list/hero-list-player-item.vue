<template>
  <article>
    <ui-card
      v-if="mode === 'QUICK'"
      elevation="4"
      class="hero-card"
      :title="hero.gameInfo.name"
    >
      <v-sheet
        height="92"
        width="92"
        class="item ma-2"
      >
        <img
          width="100"
          height="100"
          :alt="hero.gameInfo.name"
          :src="heroImage"
        >
      </v-sheet>
      <hero-player-form
        :hero="hero"
        :group-id="groupId"
        quick-save
      />
    </ui-card>

    <v-tooltip
      v-if="mode === 'NORMAL'"
      bottom
      open-delay="200"
      color="info"
    >
      <template #activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <v-sheet
            :height="small ? '64' : '90'"
            :width="small ? '64' : '90'"
            :elevation="hover ? '0' : '0'"
            :class="`item ma-1 ${hover && !notSelectable ? 'item__hover' : ''}`"
            v-bind="attrs"
            v-on="$store.state.user.user.systemSettings.heroTooltip ? on : {}"
            @click="select"
          >
            <img
              :alt="hero.gameInfo.name"
              :src="heroImage"
            >
          </v-sheet>
        </v-hover>
      </template>
      <hero-list-player-item-preview
        :hero="hero"
        :simple="simple"
      />
    </v-tooltip>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import { loadHeroImage } from '~/application/services/hero/heroService';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
    groupId: { type: String, required: false, default: '' },
    simple: { type: Boolean, required: false, default: false },
    small: { type: Boolean, required: false, default: false },
    notSelectable: { type: Boolean, required: false, default: false },
    mode: { type: String, required: false, default: 'NORMAL', validator(value) { return ['NORMAL', 'QUICK'].includes(value); } },
  },
  computed: {
    isHeroAcquired(): boolean {
      return this.hero.playerInfo.ascension !== Ascension.None;
    },
    heroImage(): string {
      return loadHeroImage(this.hero);
    },
  },
  methods: {
    select(): void {
      this.$emit('select');
    },
  },
});
</script>

<style scoped lang="scss">
.item {
  background-color: transparent;
  position: relative;
  cursor: pointer;

  img {
    margin: 0;
    width: 100%;
    //background-repeat: no-repeat;
    //background-position: center center;
    //background-size: cover;
    //border-radius: 20px 4px;
    transition: all linear 0.1s;
  }

  &__hover {
    img {
      margin: -5%;
      width: 110%;
      transition: all linear 0.1s;
    }
  }
}

.hero-card {
  max-width: 100%;
  width: 820px;
  min-height: 570px;
  margin: 8px 12px 20px;

  .item {
    position: absolute;
    top: 0;
    right: 12px;
  }
}
</style>

<style lang="scss">
.v-tooltip__content.primary {
  opacity: 1 !important;
}
</style>
