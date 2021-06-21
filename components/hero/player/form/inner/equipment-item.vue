<template>
  <div>
    <v-label class="text-subtitle-2">
      {{ label }}
    </v-label>

    <div>
      tier selection
    </div>
    <div>
      <ui-selector-faction
        :value="equip.faction"
        icon-size="18"
        @input="(value) => $store.commit('hero/SET_PLAYER_INFO_EQUIP_FACTION', { type, faction: value })"
      />
    </div>
    <div>
      stars selection
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { loadEquipmentTypeLabel } from '~/application/services/textService';

export default Vue.extend({
  props: {
    type: { type: String, required: true },
  },
  computed: {
    label(): string {
      return loadEquipmentTypeLabel(this.type as HeroEquipType);
    },
    equip(): HeroEquip {
      return this.$store.state.hero.hero.playerInfo.equipment.find((elem: HeroEquip) => elem.type === this.type as HeroEquipType);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
