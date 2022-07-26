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
      <hero-player-form-equipment-item
        :type="weaponEquipType"
        :hero="hero"
        @updateEquipTier="updateEquipTier"
        @updateEquipFaction="updateEquipFaction"
        @updateEquipStars="updateEquipStars"
      />
    </v-col>
    <v-col
      cols="12"
      :class="$vuetify.breakpoint.smAndUp ? 'pt-0' : 'pt-10'"
    >
      <hero-player-form-equipment-item
        :type="headEquipType"
        :hero="hero"
        @updateEquipTier="updateEquipTier"
        @updateEquipFaction="updateEquipFaction"
        @updateEquipStars="updateEquipStars"
      />
    </v-col>
    <v-col
      cols="12"
      :class="$vuetify.breakpoint.smAndUp ? 'pt-0' : 'pt-10'"
    >
      <hero-player-form-equipment-item
        :type="chestEquipType"
        :hero="hero"
        @updateEquipTier="updateEquipTier"
        @updateEquipFaction="updateEquipFaction"
        @updateEquipStars="updateEquipStars"
      />
    </v-col>
    <v-col
      cols="12"
      :class="$vuetify.breakpoint.smAndUp ? 'pt-0' : 'pt-10'"
    >
      <hero-player-form-equipment-item
        :type="feetEquipType"
        :hero="hero"
        @updateEquipTier="updateEquipTier"
        @updateEquipFaction="updateEquipFaction"
        @updateEquipStars="updateEquipStars"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
  },
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
  methods: {
    updateEquipTier(heroEquip: HeroEquip): void {
      this.$emit('updateEquipTier', heroEquip);
    },
    updateEquipFaction(heroEquip: HeroEquip): void {
      this.$emit('updateEquipFaction', heroEquip);
    },
    updateEquipStars(heroEquip: HeroEquip): void {
      this.$emit('updateEquipStars', heroEquip);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
