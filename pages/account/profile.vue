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
                sm="4"
                md="6"
              >
                <v-text-field
                  v-model="systemInfo.id"
                  disabled
                  label="ID"
                />

                <v-text-field
                  v-model="systemInfo.email"
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
                  autofocus
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

interface SystemInfo {
  photoUrl?: string;
}

interface GameInfo {
  nickname?: string;
  playerLevel?: number;
  crystalLevel?: number;
}

interface ComponentData {
  systemValidation: Validation;
  gameValidation: Validation;
  requestActive: boolean;
  systemInfo: SystemInfo;
  gameInfo: GameInfo;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      systemValidation: new Validation(),
      gameValidation: new Validation(),
      requestActive: false,
      systemInfo: {},
      gameInfo: {},
    };
  },
  async created() {
    await this.loadData();
    this.loadValidation();
  },
  methods: {
    async loadData(): Promise<void> {
      // TODO
      console.log(this.$store.state.user)
      // (user.providerData || []).forEach((profile) => {
      //   setAccountInfo({
      //     email: profile.email,
      //     displayName: profile.displayName || '',
      //     photoURL: profile.photoURL || '',
      //     userId: user.uid || '',
      //   });
      // });
    },
    saveSystemInfo(): void {
      if (!this.systemValidation.hasAnyError) {
        // user.updateProfile(accountInfo).then(() => {
        //   feedbackService.showSuccessMessage('Account info updated successfully!');
        // }).catch((error) => {
        //   feedbackService.showErrorMessage(error.message);
        // });

        // const heroId = this.$store.state.hero.hero.id;
        // try {
        //   const docRef = this.$fire.firestore.collection('heroes').doc(heroId);
        //   const heroData = {
        //     gameInfo: JSON.parse(JSON.stringify(this.$store.state.hero.hero.gameInfo)),
        //     systemInfo: JSON.parse(JSON.stringify(this.$store.state.hero.hero.systemInfo)),
        //   };
        //   await docRef.set(heroData);
        //   this.$emit('input', false);
        //   this.$store.commit('hero/UPDATE_HERO', new Hero(heroId, heroData.gameInfo, heroData.systemInfo));
        //   this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Hero Saved Successfully');
        //   this.resetValidation();
        // } catch (e) {
        //   this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
        // }
      }
    },
    saveGameInfo(): void {
      // TODO
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
      this.loadValidation();
    },
  },
});
</script>

<style scoped lang="scss">

</style>
