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
        :class="`item ma-2  ${isHeroAcquired ? '' : 'item__not-acquired'}`"
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
            height="82"
            width="82"
            :elevation="hover ? '24' : '0'"
            :class="`item ma-2 ${hover ? 'item__hover' : ''} ${isHeroAcquired ? '' : 'item__not-acquired'}`"
            v-bind="attrs"
            v-on="$store.state.user.user.systemSettings.heroTooltip ? on : {}"
            @click="select"
          >
            <img
              width="92"
              height="92"
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
  opacity: 0.8;
  background-color: transparent;
  transition: all ease 0.3s;
  position: relative;
  cursor: pointer;

  &__hover {
    opacity: 1;
    transition: all ease 0.3s;
  }
}

.hero-card {
  max-width: 100%;
  width: 820px;
  min-height: 570px;
  margin: 8px 12px 20px;

  .item {
    opacity: 1;
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
