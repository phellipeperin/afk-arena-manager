<template>
  <article>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="8"
          md="6"
          lg="4"
          offset-sm="2"
          offset-md="3"
          offset-lg="4"
          class="text-center"
        >
          <ui-avatar
            :photo-url="systemInfo.photoUrl"
            size="160"
            class="mb-4"
          />
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
            color="secondary"
            label="Nickname"
            :rules="validation.getRules('nickname')"
            @keyup.enter="saveSystemInfo"
            @update:error="(state) => validation.changeValidationState('nickname', state)"
          />
          <v-text-field
            v-model="systemInfo.photoUrl"
            color="secondary"
            label="Photo URL"
            :rules="validation.getRules('photoUrl')"
            @keyup.enter="saveSystemInfo"
            @update:error="(state) => validation.changeValidationState('photoUrl', state)"
          />

          <v-btn
            block
            large
            color="accent"
            :disabled="requestActive"
            :loading="requestActive"
            @click="saveSystemInfo"
          >
            Update Info
          </v-btn>
          <v-btn
            text
            block
            color="error"
            class="mt-4"
            @click="logout"
          >
            Log out
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          sm="8"
          md="6"
        >
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleRequired, ruleMinLength } from '~/application/services/validationService';
import UserSystemInfo from '~/application/domain/user/userSystemInfo';

interface ComponentData {
  requestActive: boolean;
  validation: Validation;
  systemInfo: UserSystemInfo;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      requestActive: false,
      validation: new Validation(),
      systemInfo: new UserSystemInfo(),
    };
  },
  created() {
    this.loadData();
    this.loadValidation();
  },
  methods: {
    loadData(): void {
      this.systemInfo = JSON.parse(JSON.stringify(this.$store.state.user.user.systemInfo));
    },
    async saveSystemInfo(): Promise<void> {
      if (!this.validation.hasAnyError) {
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
    loadValidation(): void {
      this.validation.addRule('photoUrl', (value: string) => ruleRequired(value));
      this.validation.addRule('nickname', (value: string) => ruleRequired(value));
      this.validation.addRule('nickname', (value: string) => ruleMinLength(value, 3));
    },
    resetValidation(): void {
      this.validation.reset();
      this.loadValidation();
    },
    logout(): void {
      this.$fire.auth.signOut().then(() => {
        this.$nuxt.$router.replace('/');
      });
    },
  },
});
</script>

<style scoped lang="scss">

</style>
