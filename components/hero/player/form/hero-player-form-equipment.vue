<template>
  <v-row>
    <v-col
      cols="12"
      class="pb-0 mb-0 mt-4"
    >
      <ui-sub-header text="Equipment" />
    </v-col>

    <v-col
      cols="12"
      :class="$vuetify.breakpoint.smAndUp ? 'pt-0' : ''"
    >
      <hero-player-form-equipment-item :type="weaponEquipType" />
    </v-col>
    <v-col
      cols="12"
      :class="$vuetify.breakpoint.smAndUp ? 'pt-0' : 'pt-10'"
    >
      <hero-player-form-equipment-item :type="headEquipType" />
    </v-col>
    <v-col
      cols="12"
      :class="$vuetify.breakpoint.smAndUp ? 'pt-0' : 'pt-10'"
    >
      <hero-player-form-equipment-item :type="chestEquipType" />
    </v-col>
    <v-col
      cols="12"
      :class="$vuetify.breakpoint.smAndUp ? 'pt-0' : 'pt-10'"
    >
      <hero-player-form-equipment-item :type="feetEquipType" />
    </v-col>
  </v-row>
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
