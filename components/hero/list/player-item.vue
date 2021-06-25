<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      shaped
      :height="140"
      :width="140"
      :elevation="hover ? 8 : 2"
      :class="`item ma-2 ${hover ? 'item__hover' : ''} ${isHeroAcquired ? '' : 'item__not-acquired'}`"
      @click="select"
    >
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
          v-if="isSignatureItemAvailable"
          :color="signatureItemColor"
          height="32"
          width="32"
          class="signature-item-container"
        >
          <span class="text-subtitle-1 font-weight-bold white--text">
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
          v-if="isEquipmentAvailable"
          class="equipment-container"
        >
          <div
            v-if="weaponEquipment.tier !== -1"
            :class="`equipment-item equipment-item__weapon ${weaponEquipment.tier === 3 ? 'equipment-item__maxed' : ''}`"
          >
            <span>
              T{{ weaponEquipment.tier }}
            </span>
          </div>
          <div
            v-if="headEquipment.tier !== -1"
            :class="`equipment-item equipment-item__head ${headEquipment.tier === 3 ? 'equipment-item__maxed' : ''}`"
          >
            <span>
              T{{ headEquipment.tier }}
            </span>
          </div>
          <div
            v-if="chestEquipment.tier !== -1"
            :class="`equipment-item equipment-item__chest ${chestEquipment.tier === 3 ? 'equipment-item__maxed' : ''}`"
          >
            <span>
              T{{ chestEquipment.tier }}
            </span>
          </div>
          <div
            v-if="feetEquipment.tier !== -1"
            :class="`equipment-item equipment-item__feet ${feetEquipment.tier === 3 ? 'equipment-item__maxed' : ''}`"
          >
            <span>
              T{{ feetEquipment.tier }}
            </span>
          </div>
        </v-sheet>

        <v-sheet
          v-if="getAscensionStarsNumber"
          class="ascension-star-container"
        >
          <v-icon
            v-for="n in getAscensionStarsNumber"
            :key="`ascension-star-${n}`"
            small
            color="legendary"
            class="star-icon"
          >
            mdi-star
          </v-icon>
        </v-sheet>
      </div>

      <v-sheet
        shaped
        :color="ascensionColor"
        height="140"
        width="140"
        class="image-profile-container"
      >
        <img
          :alt="hero.gameInfo.name"
          :src="hero.gameInfo.images.profile"
        >
      </v-sheet>
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
  isFurnitureAvailable,
  isSignatureItemAvailable,
} from '~/application/services/heroService';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';

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
    isEquipmentAvailable(): boolean {
      return !!this.hero.playerInfo.equipment.filter(elem => elem.tier !== -1).length;
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
    weaponEquipment(): HeroEquip | undefined {
      return this.hero.playerInfo.equipment.find(elem => elem.type === HeroEquipType.Weapon);
    },
    headEquipment(): HeroEquip | undefined {
      return this.hero.playerInfo.equipment.find(elem => elem.type === HeroEquipType.Head);
    },
    chestEquipment(): HeroEquip | undefined {
      return this.hero.playerInfo.equipment.find(elem => elem.type === HeroEquipType.Chest);
    },
    feetEquipment(): HeroEquip | undefined {
      return this.hero.playerInfo.equipment.find(elem => elem.type === HeroEquipType.Feet);
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
    border: 6px solid transparent;
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
  width: 128px;
  height: 128px;
  left: 6px;
  top: 6px;
  border-radius: 20px 4px;

  .signature-item-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    left: -6px;
    top: -6px;
    z-index: 4;
  }

  .equipment-container {
    position: relative;
    width: 26px;
    height: 100%;
    padding-left: 4px;
    border-top-left-radius: 20px;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.85);

    .equipment-item {
      position: absolute;
      background-color: var(--color-mythic);
      border-radius: 4px;
      color: white;
      width: 16px;
      height: 16px;
      font-size: 11px;
      display: flex;
      justify-content: center;
      align-items: center;

      &__maxed {
        background-color: var(--color-mythic-maxed);
      }

      &__weapon {
        top: 30px;
      }

      &__head {
        top: 52px;
      }

      &__chest {
        top: 74px;
      }

      &__feet {
        top: 96px;
      }
    }
  }

  .furniture-container {
    display: flex;
    position: absolute;
    width: 126px;
    height: 24px;
    padding-left: 32px;
    padding-top: 5px;
    border-top-left-radius: 20px;
    background-color: rgba(0, 0, 0, 0.85);

    .furniture-item {
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-bottom: 7px solid var(--color-mythic);
      position: relative;
      top: -5px;

      &:after {
        content: '';
        position: absolute;
        left: -5px;
        top: 7px;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-top: 7px solid var(--color-mythic);
      }

      &__maxed {
        border-bottom-color: var(--color-mythic-maxed);

        &:after {
          border-top-color: var(--color-mythic-maxed);
        }
      }
    }
  }

  .ascension-star-container {
    display: flex;
    position: absolute;
    justify-content: center;
    right: 0;
    bottom: 0;
    width: 128px;
    border-bottom-right-radius: 22px;
    background-color: rgba(0, 0, 0, 0.85);
  }

  .ascension-arrow {
    position: absolute;
    z-index: 4;

    &.bottom {
      left: -6px;
      bottom: -6px;
      width: 0;
      height: 0;
      border-bottom: 24px solid #f1f1f1;
      border-right: 24px solid transparent;
    }

    &.top {
      top: -6px;
      right: -6px;
      width: 0;
      height: 0;
      border-top: 24px solid #f1f1f1;
      border-left: 24px solid transparent;
    }
  }
}

</style>
