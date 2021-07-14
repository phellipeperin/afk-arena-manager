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
                <v-avatar
                  color="primary"
                  size="160"
                >
                  <img
                    v-if="systemInfo.photoUrl"
                    :src="systemInfo.photoUrl"
                    alt="Avatar"
                  >
                  <span
                    v-else
                    class="white--text"
                  >
                    <v-icon
                      dark
                      size="82"
                    >
                      mdi-account-circle
                    </v-icon>
                  </span>
                </v-avatar>
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
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="6"
              >
                <v-text-field
                  v-model="gameInfo.nickname"
                  label="Nickname"
                  :rules="gameValidation.getRules('nickname')"
                  @keyup.enter="saveSystemInfo"
                  @update:error="(state) => gameValidation.changeValidationState('nickname', state)"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="6"
              >
                <v-text-field
                  v-model="gameInfo.playerLevel"
                  type="number"
                  label="Player Level"
                  :rules="gameValidation.getRules('playerLevel')"
                  @keyup.enter="saveSystemInfo"
                  @update:error="(state) => gameValidation.changeValidationState('playerLevel', state)"
                />

                <v-text-field
                  v-model="gameInfo.crystalLevel"
                  type="number"
                  label="Crystal Level"
                  :rules="gameValidation.getRules('crystalLevel')"
                  @keyup.enter="saveSystemInfo"
                  @update:error="(state) => gameValidation.changeValidationState('crystalLevel', state)"
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
import Validation, { ruleRequired, ruleMinLength, ruleIsURL } from '~/application/services/validationService';
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
      this.systemInfo = this.$store.state.user.user.systemInfo;
      this.gameInfo = this.$store.state.user.user.gameInfo;
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
      if (!this.systemValidation.hasAnyError) {
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
      this.systemValidation.addRule('photoUrl', (value: string) => ruleIsURL(value));

      this.gameValidation.addRule('nickname', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('nickname', (value: string) => ruleMinLength(value, 3));
      this.gameValidation.addRule('playerLevel', (value: string) => ruleRequired(value));
      this.gameValidation.addRule('crystalLevel', (value: string) => ruleRequired(value));
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
