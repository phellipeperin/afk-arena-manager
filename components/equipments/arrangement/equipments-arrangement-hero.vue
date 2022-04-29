<template>
  <v-col
    cols="12"
    md="6"
  >
    <ui-card
      :title="info.hero.gameInfo.name"
      elevation="0"
      class="full-height"
    >
      <v-row class="py-5 px-2">
        <v-col
          cols="12"
          md="3"
          lg="2"
          class="d-flex align-center justify-center"
        >
          <ui-avatar
            rounded
            size="82"
            :photo-url="info.hero.gameInfo.images.profile"
          />
        </v-col>
        <v-col
          cols="12"
          md="9"
          lg="10"
        >
          <v-row
            v-for="(equip, index) in info.equipments"
            :key="equip.equipment.type"
            class="equip-row"
          >
            <v-col
              v-if="index"
              cols="12"
              class="ma-0 pa-0"
            >
              <v-divider />
            </v-col>
            <v-col
              cols="3"
              lg="2"
              class="d-flex align-center justify-center"
            >
              <equipments-visual-item
                :hero-type="info.hero.gameInfo.type"
                :equip="equip.equipment"
              />
            </v-col>
            <v-col
              cols="9"
              lg="10"
              class="d-flex flex-wrap align-center pl-8"
            >
              <article
                v-for="possibleHero in equip.possibleHeroes"
                :key="possibleHero.id"
                class="my-1 mx-2 possible-hero"
              >
                <v-hover v-slot="{ hover }">
                  <article>
                    <ui-avatar
                      :photo-url="possibleHero.gameInfo.images.profile"
                      rounded
                      size="68"
                      :class="`possible-hero__image ${(possibleHero.playerInfo.ascension === 'NONE' || (canSwap(possibleHero) && hover)) ? 'faded' : ''}`"
                    />
                    <transition name="fade">
                      <v-btn
                        v-show="hover && canSwap(possibleHero)"
                        fab
                        small
                        color="accent"
                        class="possible-hero__swap-button"
                        @click="swap(info.hero, possibleHero)"
                      >
                        <v-icon>mdi-swap-horizontal</v-icon>
                      </v-btn>
                    </transition>
                  </article>
                </v-hover>
              </article>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </ui-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationArrangementHero from '~/application/domain/equipment/equipmentInformationArrangementHero';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { loadEquipmentTierImage, loadFactionImage } from '~/application/services/imageService';
import { Faction } from '~/application/domain/info/faction';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    info: { type: EquipmentInformationArrangementHero, required: true },
  },
  methods: {
    loadEquipmentImage(tier: number, equipType: HeroEquipType): string {
      return loadEquipmentTierImage(tier, this.info.hero.gameInfo.type, equipType);
    },
    loadFactionImage(faction: Faction): string {
      return loadFactionImage(faction);
    },
    canSwap(possibleHero: Hero): boolean {
      return possibleHero.playerInfo.ascension !== 'NONE' && this.info.hero.id !== possibleHero.id;
    },
    swap(hero: Hero, possibleHero: Hero): void {
      this.$emit('swap', hero, possibleHero);
    },
  },
});
</script>

<style scoped lang="scss">
.equip-row {
  min-height: 92px;
}

.possible-hero {
  position: relative;

  &__image {
    transition: all ease 0.2s;

    &.faded {
      opacity: 0.2;
      transition: all ease 0.2s;
    }
  }

  &__swap-button {
    position: absolute;
    top: 14px;
    left: 14px;
  }
}

.fade-enter-active {
  transition: opacity ease .2s .1s;
}
.fade-leave-active {
  transition: opacity ease .1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
