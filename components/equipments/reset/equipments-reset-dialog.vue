<template>
  <app-dialog
    :value="value"
    title="Reset Equipments"
    max-width="600"
    @input="close"
  >
    <v-container
      v-if="value"
      fluid
    >
      <v-row>
        <v-col
          cols="12"
          class="d-flex align-center justify-center"
        >
          <ui-avatar
            rounded
            size="82"
            :photo-url="hero.gameInfo.images.profile"
          />
        </v-col>
      </v-row>
      <equipments-reset-row
        :equip-type="weaponType"
        :hero="hero"
      />
      <equipments-reset-row
        :equip-type="headType"
        :hero="hero"
      />
      <equipments-reset-row
        :equip-type="chestType"
        :hero="hero"
      />
      <equipments-reset-row
        :equip-type="feetType"
        :hero="hero"
      />
    </v-container>

    <template #actions>
      <v-btn
        text
        @click="close"
      >
        Close
      </v-btn>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
    hero: { type: Hero, required: true },
  },
  computed: {
    weaponType(): HeroEquipType { return HeroEquipType.Weapon; },
    headType(): HeroEquipType { return HeroEquipType.Head; },
    chestType(): HeroEquipType { return HeroEquipType.Chest; },
    feetType(): HeroEquipType { return HeroEquipType.Feet; },
  },
  methods: {
    close(): void {
      this.$emit('input', false);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
