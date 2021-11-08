<template>
  <ui-card title="Game Info">
    <v-container>
      <ui-sub-header text="Levels" />
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="gameInfo.playerLevel"
            type="number"
            label="Player Level"
            :rules="validation.getRules('playerLevel')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('playerLevel', state)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="gameInfo.crystalLevel"
            type="number"
            label="Crystal Level"
            :rules="validation.getRules('crystalLevel')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('crystalLevel', state)"
          />
        </v-col>
      </v-row>

      <ui-sub-header text="Progression" />
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.campaignMap"
            hide-details
            type="number"
            label="Campaign Map"
            :rules="validation.getRules('campaignMap')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('campaignMap', state)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.campaignLevel"
            hide-details
            type="number"
            label="Campaign Level"
            :rules="validation.getRules('campaignLevel')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('campaignLevel', state)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.kingsTowerFloor"
            hide-details
            type="number"
            label="King's Tower Floor"
            :rules="validation.getRules('kingsTowerFloor')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('kingsTowerFloor', state)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.celestialTowerFloor"
            hide-details
            type="number"
            label="Celestial Tower Floor"
            :rules="validation.getRules('celestialTowerFloor')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('celestialTowerFloor', state)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.hypogeanTowerFloor"
            hide-details
            type="number"
            label="Hypogean Tower Floor"
            :rules="validation.getRules('hypogeanTowerFloor')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('hypogeanTowerFloor', state)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.lightbearerTowerFloor"
            hide-details
            type="number"
            label="Lightbearer Floor"
            :rules="validation.getRules('lightbearerTowerFloor')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('lightbearerTowerFloor', state)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.maulerTowerFloor"
            hide-details
            type="number"
            label="Mauler Tower Floor"
            :rules="validation.getRules('maulerTowerFloor')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('maulerTowerFloor', state)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.wilderTowerFloor"
            hide-details
            type="number"
            label="Wilder Tower Floor"
            :rules="validation.getRules('wilderTowerFloor')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('wilderTowerFloor', state)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
          class="pb-0"
        >
          <v-text-field
            v-model="gameInfo.gravebornTowerFloor"
            type="number"
            label="Graveborn Tower Floor"
            :rules="validation.getRules('gravebornTowerFloor')"
            @keyup.enter="saveGameInfo"
            @update:error="(state) => validation.changeValidationState('gravebornTowerFloor', state)"
          />
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <v-btn
        raised
        large
        color="primary"
        :disabled="requestActive"
        :loading="requestActive"
        @click="saveGameInfo"
      >
        Update
      </v-btn>
    </template>
  </ui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleRequired, ruleMinLength } from '~/application/services/validationService';
import UserGameInfo from '~/application/domain/user/userGameInfo';

interface ComponentData {
  requestActive: boolean;
  validation: Validation;
  gameInfo: UserGameInfo;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      requestActive: false,
      validation: new Validation(),
      gameInfo: new UserGameInfo(),
    };
  },
  created() {
    this.loadData();
    this.loadValidation();
  },
  methods: {
    loadData(): void {
      this.gameInfo = JSON.parse(JSON.stringify(this.$store.state.user.user.gameInfo));
    },
    async saveGameInfo(): Promise<void> {
      if (!this.validation.hasAnyError) {
        try {
          this.requestActive = true;
          const docRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
          const data = {
            gameInfo: JSON.parse(JSON.stringify(this.gameInfo)),
          };
          await docRef.update(data);
          this.$store.commit('user/SET_GAME_INFO', data);
          this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Game Info Updated Successfully');
          this.resetValidation();
        } catch (e) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
        } finally {
          this.requestActive = false;
        }
      }
    },
    loadValidation(): void {
      this.validation.addRule('playerLevel', (value: string) => ruleRequired(value));
      this.validation.addRule('crystalLevel', (value: string) => ruleRequired(value));
      this.validation.addRule('campaignMap', (value: string) => ruleRequired(value));
      this.validation.addRule('campaignMap', (value: string) => ruleMinLength(value, 2));
      this.validation.addRule('campaignLevel', (value: string) => ruleRequired(value));
      this.validation.addRule('campaignLevel', (value: string) => ruleMinLength(value, 2));
      this.validation.addRule('kingsTowerFloor', (value: string) => ruleRequired(value));
      this.validation.addRule('celestialTowerFloor', (value: string) => ruleRequired(value));
      this.validation.addRule('hypogeanTowerFloor', (value: string) => ruleRequired(value));
      this.validation.addRule('lightbearerTowerFloor', (value: string) => ruleRequired(value));
      this.validation.addRule('maulerTowerFloor', (value: string) => ruleRequired(value));
      this.validation.addRule('wilderTowerFloor', (value: string) => ruleRequired(value));
      this.validation.addRule('gravebornTowerFloor', (value: string) => ruleRequired(value));
    },
    resetValidation(): void {
      this.validation.reset();
      this.loadValidation();
    },
  },
});
</script>

<style scoped lang="scss">

</style>
