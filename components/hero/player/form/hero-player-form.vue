<template>
  <form class="player-hero-form">
    <v-container fluid>
      <hero-player-form-ascension-data
        :hero="heroData"
        :simple="!!groupId"
        @updateAscension="updateAscension"
        @updateNoOfCopies="updateNoOfCopies"
        @updateOnCrystal="updateOnCrystal"
      />
      <hero-player-form-general-data
        v-if="isHeroAcquired"
        :hero="heroData"
        @updateSignatureItem="updateSignatureItem"
        @updateFurniture="updateFurniture"
        @updateEngrave="updateEngrave"
      />
      <hero-player-form-equipment
        v-if="isHeroAcquired && !groupId"
        :hero="heroData"
        @updateEquipTier="updateEquipTier"
        @updateEquipFaction="updateEquipFaction"
        @updateEquipStars="updateEquipStars"
      />
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Ascension } from '~/application/domain/info/ascension';
import Hero from '~/application/domain/hero/hero';
import { getMinNumberOfCopies } from '~/application/services/resource/resourceAscensionService';
import { isSignatureItemAvailable } from '~/application/services/resource/resourceSignatureItemService';
import { isEngraveAvailable } from '~/application/services/resource/resourceEngraveService';
import { isFurnitureAvailable } from '~/application/services/resource/resourceFurnitureService';
import HeroEquip from '~/application/domain/hero/hero-equip';
import { Faction } from '~/application/domain/info/faction';

interface ComponentData {
  heroData: Hero;
}

export default Vue.extend({
  props: {
    hero: { type: Object, required: true },
    groupId: { type: String, required: false, default: '' },
  },
  data(): ComponentData {
    return {
      heroData: new Hero(),
    };
  },
  computed: {
    isHeroAcquired(): boolean {
      return this.hero.playerInfo.ascension !== Ascension.None;
    },
    docRefPath(): string {
      const userId = this.$store.state.user.user.id;
      if (this.groupId) {
        if (this.groupId === 'personal') {
          return `users/${userId}/objective`;
        }
        return `groups/${this.groupId}/objective`;
      }
      return `users/${userId}/heroes`;
    },
  },
  created(): void {
    this.heroData = new Hero(this.hero.id, this.hero.gameInfo, this.hero.systemInfo, this.hero.playerInfo);
  },
  methods: {
    async saveUpdate(): Promise<void> {
      const heroId = this.hero.id;
      try {
        const docRef = this.$fire.firestore.collection(this.docRefPath).doc(heroId);
        await docRef.update(JSON.parse(JSON.stringify(this.hero.playerInfo)));
        this.$store.commit(`hero/${this.groupId ? 'UPDATE_OBJECTIVE_HERO' : 'UPDATE_PLAYER_HERO'}`, { id: this.groupId || this.$store.state.user.user.id, hero: this.hero });
        this.$emit('saved');
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      }
    },
    // Update information
    updateAscension(ascension: Ascension): void {
      this.heroData.playerInfo.ascension = ascension;
      const minCopies = getMinNumberOfCopies(this.heroData.gameInfo.faction, this.heroData.gameInfo.awakened, ascension);
      if (minCopies > this.heroData.playerInfo.numberOfCopies) {
        this.heroData.playerInfo.numberOfCopies = minCopies;
      }
      if (!isSignatureItemAvailable(ascension)) {
        this.heroData.playerInfo.signatureItem = -1;
      }
      if (!isEngraveAvailable(ascension)) {
        this.heroData.playerInfo.engrave = 0;
      }
      if (!isFurnitureAvailable(ascension)) {
        this.heroData.playerInfo.furniture = 0;
      }
      if (ascension === Ascension.None) {
        this.heroData.playerInfo.numberOfCopies = 0;
        this.heroData.playerInfo.onCrystal = false;
        this.heroData.playerInfo.equipment = this.heroData.playerInfo.equipment.map((elem: HeroEquip) => (new HeroEquip(elem.type)));
      }
    },
    updateNoOfCopies(numberOfCopies: number): void {
      this.heroData.playerInfo.numberOfCopies = numberOfCopies;
    },
    updateOnCrystal(onCrystal: boolean): void {
      this.heroData.playerInfo.onCrystal = onCrystal || false;
    },
    updateSignatureItem(signatureItem: number): void {
      this.heroData.playerInfo.signatureItem = signatureItem;
    },
    updateFurniture(furniture: number): void {
      this.heroData.playerInfo.furniture = furniture;
    },
    updateEngrave(engrave: number): void {
      this.heroData.playerInfo.engrave = engrave;
    },
    updateEquipTier({ type, tier }: HeroEquip): void {
      const newTier = Number(tier);
      const index = this.heroData.playerInfo.equipment.findIndex((elem: HeroEquip) => elem.type === type);
      this.heroData.playerInfo.equipment[index].tier = newTier;
      if (newTier >= 3) {
        this.heroData.playerInfo.equipment[index].faction = this.heroData.gameInfo.faction;
        this.heroData.playerInfo.equipment[index].stars = 5;
      }
      if (newTier === -1) {
        this.heroData.playerInfo.equipment[index].faction = Faction.None;
        this.heroData.playerInfo.equipment[index].stars = 0;
      }
    },
    updateEquipFaction({ type, faction }: HeroEquip): void {
      const index = this.heroData.playerInfo.equipment.findIndex((elem: HeroEquip) => elem.type === type);
      this.heroData.playerInfo.equipment[index].faction = faction;
    },
    updateEquipStars({ type, stars }: HeroEquip): void {
      const index = this.heroData.playerInfo.equipment.findIndex((elem: HeroEquip) => elem.type === type);
      this.heroData.playerInfo.equipment[index].stars = stars;
    },
  },
});
</script>

<style scoped lang="scss">
.player-hero-form {
  min-height: 440px;
}
</style>
