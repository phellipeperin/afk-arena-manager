<template>
  <ui-card title="System Info">
    <v-container>
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
            :rules="validation.getRules('nickname')"
            @keyup.enter="saveSystemInfo"
            @update:error="(state) => validation.changeValidationState('nickname', state)"
          />

          <v-text-field
            v-model="systemInfo.photoUrl"
            label="Photo URL"
            :rules="validation.getRules('photoUrl')"
            @keyup.enter="saveSystemInfo"
            @update:error="(state) => validation.changeValidationState('photoUrl', state)"
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
        @click="saveSystemInfo"
      >
        Update
      </v-btn>
    </template>
  </ui-card>
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
  },
});
</script>

<style scoped lang="scss">

</style>
