<template>
  <div class="mb-5">
    <ui-sub-header text="Equipment" />

    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <hero-player-form-inner-equipment-item :type="weaponEquipType" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <hero-player-form-inner-equipment-item :type="headEquipType" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <hero-player-form-inner-equipment-item :type="chestEquipType" />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <hero-player-form-inner-equipment-item :type="feetEquipType" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';

export default Vue.extend({
  computed: {
    weaponEquipType(): HeroEquipType {
      return HeroEquipType.Weapon;
    },
    headEquipType(): HeroEquipType {
      return HeroEquipType.Head;
    },
    chestEquipType(): HeroEquipType {
      return HeroEquipType.Chest;
    },
    feetEquipType(): HeroEquipType {
      return HeroEquipType.Feet;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
