<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      shaped
      height="100"
      :width="hover ? 100 : 100"
      :elevation="hover ? '8' : '2'"
      :class="`item ma-2 ${hover ? 'item__hover' : ''} ${isHeroAcquired ? '' : 'item__not-acquired'}`"
      @click="select"
    >
      <v-sheet
        shaped
        :color="ascensionColor"
        height="100"
        width="100"
        class="image-profile-container"
      >
        <img
          :alt="hero.gameInfo.name"
          :src="hero.gameInfo.images.profile"
        >
      </v-sheet>

      <div
        v-if="isHeroAcquired"
        class="content-container"
      >
        <div
          v-if="isAscensionPlus"
          class="ascension-arrow bottom"
        />
        <div
          v-if="isAscensionPlus"
          class="ascension-arrow top"
        />

        <v-sheet
          v-if="getAscensionStarsNumber"
          class="ascension-star-container"
        >
          <v-icon
            v-for="n in getAscensionStarsNumber"
            :key="`ascension-star-${n}`"
            x-small
            :color="getAscensionStarColor"
            class="star-icon"
          >
            mdi-star
          </v-icon>
        </v-sheet>

        <v-sheet
          v-if="isSignatureItemAvailable"
          :color="signatureItemColor"
          height="20"
          width="20"
          class="signature-item-container"
        >
          <span class="text-caption font-weight-bold white--text">
            {{ hero.playerInfo.signatureItem }}
          </span>
        </v-sheet>

        <v-sheet
          v-if="isFurnitureAvailable"
          class="furniture-container"
        >
          <div
            v-for="n in getMythicFurnitureMaxedCount"
            :key="`furniture-maxed-${n}`"
            class="furniture-item furniture-item__maxed"
          />
          <div
            v-for="n in getMythicFurnitureNotMaxedCount"
            :key="`furniture-${n}`"
            class="furniture-item"
          />
        </v-sheet>

        <v-sheet
          v-if="getEquipmentMaxed > 0"
          class="equipment-container"
        >
          <div
            v-for="n in getEquipmentMaxed"
            :key="`equipment-${n}`"
            class="equipment-item"
          />
        </v-sheet>
      </div>
    </v-sheet>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import {
  getAscensionColor,
  getSignatureItemColor,
  getAscensionStarColor,
  isFurnitureAvailable,
  isSignatureItemAvailable,
} from '~/application/services/heroService';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
  },
  computed: {
    isHeroAcquired(): boolean {
      return this.hero.playerInfo.ascension !== Ascension.None;
    },
    isSignatureItemAvailable(): boolean {
      return isSignatureItemAvailable(this.hero.playerInfo.ascension) && this.hero.playerInfo.signatureItem !== -1;
    },
    isFurnitureAvailable(): boolean {
      return isFurnitureAvailable(this.hero.playerInfo.ascension) && !!this.hero.playerInfo.furniture.filter(elem => elem.plus !== -1).length;
    },
    getEquipmentMaxed(): number {
      return this.hero.playerInfo.equipment.filter(elem => elem.tier === 3).length;
    },
    isAscensionPlus(): boolean {
      const { ascension } = this.hero.playerInfo;
      return ascension === Ascension.ElitePlus || ascension === Ascension.LegendaryPlus || ascension === Ascension.MythicPlus;
    },
    getAscensionStarsNumber(): number {
      switch (this.hero.playerInfo.ascension) {
        case Ascension.Ascended1Star: { return 1; }
        case Ascension.Ascended2Star: { return 2; }
        case Ascension.Ascended3Star: { return 3; }
        case Ascension.Ascended4Star: { return 4; }
        case Ascension.Ascended5Star: { return 5; }
      }
      return 0;
    },
    getMythicFurnitureNotMaxedCount(): number {
      return this.hero.playerInfo.furniture.filter(elem => elem.plus !== -1 && elem.plus !== 3).length;
    },
    getMythicFurnitureMaxedCount(): number {
      return this.hero.playerInfo.furniture.filter(elem => elem.plus === 3).length;
    },
    ascensionColor(): string {
      return getAscensionColor(this.hero.playerInfo.ascension);
    },
    signatureItemColor(): string {
      return getSignatureItemColor(this.hero.playerInfo.signatureItem);
    },
    getAscensionStarColor(): string {
      return getAscensionStarColor(this.hero.playerInfo.engrave);
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
  transition: all ease 0.3s;
  position: relative;
  cursor: pointer;

  &__not-acquired {
    opacity: 0.4;
    transition: all ease 0.3s;
  }

  &__hover {
    opacity: 1;
    transition: all ease 0.3s;
  }

  .image-profile-container {
    position: absolute;
    left: 0;
    border: 4px solid transparent;
    transition: all ease 0.3s;

    img {
      width: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      border-radius: 20px 4px;
      transition: all ease 0.3s;

      -webkit-box-shadow: 0 0 32px -16px rgb(0 0 0 / 60%);
      box-shadow: 0 0 32px -16px rgb(0 0 0 / 60%);
    }
  }
}

.content-container {
  position: absolute;
  z-index: 2;
  width: 92px;
  height: 92px;
  left: 4px;
  top: 4px;
  border-radius: 20px 4px;

  .signature-item-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    left: -4px;
    top: -4px;
    z-index: 4;
  }

  .furniture-container {
    display: flex;
    position: absolute;
    align-items: center;
    width: 90px;
    height: 16px;
    padding-left: 20px;
    border-top-left-radius: 20px;
    background-color: rgba(0, 0, 0, 0.75);

    .furniture-item {
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-bottom: 6px solid var(--color-mythic);
      position: relative;
      top: -4px;
      margin: 0 -1px 0 0 ;

      &:after {
        content: '';
        position: absolute;
        left: -4px;
        top: 6px;
        width: 0;
        height: 0;
        border: 4px solid transparent;
        border-top: 6px solid var(--color-mythic);
      }

      &__maxed {
        border-bottom-color: var(--color-mythic-maxed);

        &:after {
          border-top-color: var(--color-mythic-maxed);
        }
      }
    }
  }

  .equipment-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 12px;
    width: 10px;
    height: 64px;
    border-top-left-radius: 20px;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.75);

    .equipment-item {
      background-color: var(--color-mythic-maxed);
      width: 6px;
      height: 6px;
      border-radius: 3px;
      margin: 2px 0;
    }
  }

  .ascension-star-container {
    display: flex;
    position: absolute;
    justify-content: center;
    left: 0;
    bottom: 0;
    width: 90px;
    height: 16px;
    border-bottom-right-radius: 18px;
    background-color: rgba(0, 0, 0, 0.7);

    .star-icon {
      margin: 0 -2px;
    }
  }

  .ascension-arrow {
    position: absolute;
    z-index: 4;

    &.bottom {
      left: -4px;
      bottom: -4px;
      width: 0;
      height: 0;
      border-bottom: 14px solid #fafafa;
      border-right: 14px solid transparent;
    }

    &.top {
      top: -4px;
      right: -4px;
      width: 0;
      height: 0;
      border-top: 14px solid #fafafa;
      border-left: 14px solid transparent;
    }
  }
}
</style>
