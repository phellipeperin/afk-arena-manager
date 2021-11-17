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
          <v-badge
            bordered
            overlap
            :value="showPriority"
            :color="getPriorityColor(info.hero.playerInfo.priority)"
            :content="info.hero.playerInfo.priority"
          >
            <ui-avatar
              rounded
              size="82"
              :photo-url="info.hero.gameInfo.images.profile"
            />
          </v-badge>
        </v-col>
        <v-col
          cols="12"
          md="9"
          lg="10"
        >
          <v-row
            v-for="(equip, index) in info.equipments"
            :key="equip.equipment.type"
            no-gutters
            class="equip-row"
          >
            <v-col
              v-if="index"
              cols="12"
              class="pt-1 pb-3"
            >
              <v-divider />
            </v-col>
            <v-col
              cols="3"
              lg="2"
              class="d-flex align-center justify-center equip-image-container"
            >
              <ui-avatar
                :photo-url="loadEquipmentImage(equip.equipment.tier, equip.equipment.type)"
                rounded
                size="52"
              />
              <ui-avatar
                :photo-url="loadFactionImage(equip.equipment.faction)"
                size="18"
                class="equip-image-faction"
              />
            </v-col>
            <v-col
              cols="9"
              lg="10"
              class="d-flex flex-wrap align-center pl-8"
            >
              <v-badge
                v-for="possibleHero in equip.possibleHeroes"
                :key="possibleHero.id"
                bordered
                overlap
                :value="showPriority"
                :color="getPriorityColor(possibleHero.playerInfo.priority)"
                :content="possibleHero.playerInfo.priority"
                class="my-1 mx-2"
              >
                <ui-avatar
                  :photo-url="possibleHero.gameInfo.images.profile"
                  rounded
                  size="68"
                />
              </v-badge>
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
import { getPriorityColor } from '~/application/services/resource/resourcePriorityService';

export default Vue.extend({
  props: {
    info: { type: EquipmentInformationArrangementHero, required: true },
    showPriority: { type: Boolean, required: false, default: false },
  },
  methods: {
    loadEquipmentImage(tier: number, equipType: HeroEquipType): string {
      return loadEquipmentTierImage(tier, this.info.hero.gameInfo.type, equipType);
    },
    loadFactionImage(faction: Faction): string {
      return loadFactionImage(faction);
    },
    getPriorityColor(value: number): string {
      return getPriorityColor(value);
    },
  },
});
</script>

<style scoped lang="scss">
.equip-row {
  min-height: 92px;
}

.equip-image-container {
  position: relative;

  .equip-image-faction {
    position: absolute;
    margin-top: -36px;
    margin-left: -36px;
  }
}
</style>
