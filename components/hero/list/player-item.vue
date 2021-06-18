<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      shaped
      :height="140"
      :width="140"
      :elevation="hover ? 8 : 1"
      :class="`item ma-2 ${hover ? 'item__hover' : ''}`"
      @click="select"
    >
      <div class="content-container">
        <div class="ascension-arrow bottom" />
        <div class="ascension-arrow top" />

        <v-sheet
          color="mythic"
          height="32"
          width="32"
          class="signature-item-container"
        >
          <span class="text-subtitle-1 font-weight-bold white--text">
            30
          </span>
        </v-sheet>

        <v-sheet
          class="furniture-container"
        >
          <div class="furniture-item" />
          <div class="furniture-item" />
          <div class="furniture-item" />

          <div class="furniture-item" />
          <div class="furniture-item" />
          <div class="furniture-item" />

          <div class="furniture-item" />
          <div class="furniture-item" />
          <div class="furniture-item" />
        </v-sheet>

        <v-sheet
          class="equipment-container"
        >
          <div class="equipment-item equipment-item__weapon">
            <span>T3</span>
          </div>
          <div class="equipment-item equipment-item__head">
            <span>T3</span>
          </div>
          <div class="equipment-item equipment-item__chest">
            <span>T3</span>
          </div>
          <div class="equipment-item equipment-item__feet">
            <span>T3</span>
          </div>
        </v-sheet>

        <v-sheet
          class="ascension-star-container"
        >
          <v-icon
            small
            color="legendary"
            class="star-icon"
          >
            mdi-star
          </v-icon>
          <v-icon
            small
            color="legendary"
            class="star-icon"
          >
            mdi-star
          </v-icon>
          <v-icon
            small
            color="legendary"
            class="star-icon"
          >
            mdi-star
          </v-icon>
          <v-icon
            small
            color="legendary"
            class="star-icon"
          >
            mdi-star
          </v-icon>
          <v-icon
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
        :color="borderColor"
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

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
  },
  computed: {
    borderColor(): string {
      return 'elite';
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

  &__hover {
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
  z-index: 9;
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
    z-index: 99;
  }

  .equipment-container {
    position: relative;
    width: 26px;
    height: 104px;
    padding-left: 4px;
    padding-top: 12px;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.85);

    .equipment-item {
      position: absolute;
      background-color: red;
      border-radius: 4px;
      color: white;
      width: 16px;
      height: 16px;
      font-size: 11px;
      display: flex;
      justify-content: center;
      align-items: center;

      &__weapon {
        top: 8px;
      }

      &__head {
        top: 30px;
      }

      &__chest {
        top: 52px;
      }

      &__feet {
        top: 74px;
      }
    }
  }

  .furniture-container {
    display: flex;
    width: 100%;
    height: 24px;
    padding-left: 32px;
    padding-top: 5px;
    border-top-left-radius: 20px;
    background-color: rgba(0, 0, 0, 0.85);

    .furniture-item {
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-bottom: 7px solid red;
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
        border-top: 7px solid red;
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
    z-index: 999;

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
