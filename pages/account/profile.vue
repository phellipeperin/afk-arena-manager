<template>
  <div>
    <ui-page-header title="Profile" />

    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <ui-card title="System Info">
          <div class="px-4 pt-2">
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="6"
                class="d-flex justify-center align-center"
              >
                <ui-avatar
                  :photo-url="systemInfo.photoUrl"
                  size="160"
                />
              </v-col>
              <v-col
                cols="12"
                sm="8"
                md="6"
              >
                <v-text-field
                  :value="$store.state.user.user.id"
                  disabled
                  label="ID"
                />

                <v-text-field
                  :value="$store.state.user.user.email"
                  disabled
                  label="Email"
                />

                <v-text-field
                  v-model="systemInfo.nickname"
                  label="Nickname"
                  :rules="systemValidation.getRules('nickname')"
                  @keyup.enter="saveSystemInfo"
                  @update:error="(state) => systemValidation.changeValidationState('nickname', state)"
                />

                <v-text-field
                  v-model="systemInfo.photoUrl"
                  label="Photo URL"
                  :rules="systemValidation.getRules('photoUrl')"
                  @keyup.enter="saveSystemInfo"
                  @update:error="(state) => systemValidation.changeValidationState('photoUrl', state)"
                />
              </v-col>
            </v-row>
          </div>

          <template #actions>
            <v-btn
              raised
              large
              color="primary"
              :disabled="requestActive"
              :loading="requestActive"
              @click="saveSystemInfo"
            >
              Update
            </v-btn>
          </template>
        </ui-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <ui-card title="Game Info">
          <div class="px-4 pt-2">
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
                  :rules="gameValidation.getRules('playerLevel')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('playerLevel', state)"
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
                  :rules="gameValidation.getRules('crystalLevel')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('crystalLevel', state)"
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
                  :rules="gameValidation.getRules('campaignMap')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('campaignMap', state)"
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
                  :rules="gameValidation.getRules('campaignLevel')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('campaignLevel', state)"
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
                  :rules="gameValidation.getRules('kingsTowerFloor')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('kingsTowerFloor', state)"
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
                  :rules="gameValidation.getRules('celestialTowerFloor')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('celestialTowerFloor', state)"
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
                  :rules="gameValidation.getRules('hypogeanTowerFloor')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('hypogeanTowerFloor', state)"
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
                  :rules="gameValidation.getRules('lightbearerTowerFloor')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('lightbearerTowerFloor', state)"
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
                  :rules="gameValidation.getRules('maulerTowerFloor')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('maulerTowerFloor', state)"
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
                  :rules="gameValidation.getRules('wilderTowerFloor')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('wilderTowerFloor', state)"
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
                  hide-details
                  type="number"
                  label="Graveborn Tower Floor"
                  :rules="gameValidation.getRules('gravebornTowerFloor')"
                  @keyup.enter="saveGameInfo"
                  @update:error="(state) => gameValidation.changeValidationState('gravebornTowerFloor', state)"
                />
              </v-col>
            </v-row>
          </div>

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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleRequired, ruleMinLength } from '~/application/services/validationService';
import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import UserGameInfo from '~/application/domain/user/userGameInfo';

interface ComponentData {
  requestActive: boolean;
  systemValidation: Validation;
  gameValidation: Validation;
  systemInfo: UserSystemInfo;
  gameInfo: UserGameInfo;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      requestActive: false,
      systemValidation: new Validation(),
      gameValidation: new Validation(),
      systemInfo: new UserSystemInfo(),
      gameInfo: new UserGameInfo(),
    };
  },
  created() {
    this.loadData();
    this.loadValidation();
  },
  methods: {
    loadData(): void {
      this.systemInfo = JSON.parse(JSON.stringify(this.$store.state.user.user.systemInfo));
      this.gameInfo = JSON.parse(JSON.stringify(this.$store.state.user.user.gameInfo));
    },
    async saveSystemInfo(): Promise<void> {
      if (!this.systemValidation.hasAnyError) {
        try {
          this.requestActive = true;
          const docRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
          const data = {
            systemInfo: JSON.parse(JSON.stringify(this.systemInfo)),
          };
          await docRef.update(data);
          this.$store.commit('user/SET_SYSTEM_INFO', data);
          this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'System Info Updated Successfully');
          this.resetValidation();
        } catch (e) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
        } finally {
          this.requestActive = false;
        }
      }
    },
    async saveGameInfo(): Promise<void> {
      if (!this.gameValidation.hasAnyError) {
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
      this.systemValidation.addRule('photoUrl', (value: string) => ruleRequired(value));
      this.systemValidation.addRule('nickname', (value: string) => ruleRequired(value));
      this.systemValidation.addRule('nickname', (value: string) => ruleMinLength(value, 3));

      this.gameValidation.addRule('playerLevel', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('crystalLevel', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('campaignMap', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('campaignMap', (value: string) => ruleMinLength(value, 2));
      this.gameValidation.addRule('campaignLevel', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('campaignLevel', (value: string) => ruleMinLength(value, 2));
      this.gameValidation.addRule('kingsTowerFloor', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('celestialTowerFloor', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('hypogeanTowerFloor', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('lightbearerTowerFloor', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('maulerTowerFloor', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('wilderTowerFloor', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('gravebornTowerFloor', (value: string) => ruleRequired(value));
    },
    resetValidation(): void {
      this.systemValidation.reset();
      this.gameValidation.reset();
      this.loadValidation();
    },
  },
});
</script>

<style scoped lang="scss">

</style>
