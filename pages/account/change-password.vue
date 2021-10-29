<template>
  <div>
    <ui-page-header title="Change Password" />

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        offset-sm="3"
        offset-md="4"
      >
        <ui-card title="Change Password">
          <div class="px-4 pt-2">
            <v-text-field
              v-model="password"
              autofocus
              label="Password"
              hint="Minimum 6 characters"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validation.getRules('password')"
              @click:append="showPassword = !showPassword"
              @keyup.enter="updatePassword"
              @update:error="(state) => validation.changeValidationState('password', state)"
            />
            <v-text-field
              v-model="passwordConfirmation"
              label="Confirm Password"
              hint="Minimum 6 characters. Must match password."
              :type="showPasswordConfirmation ? 'text' : 'password'"
              :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validation.getRules('passwordConfirmation')"
              @click:append="showPasswordConfirmation = !showPasswordConfirmation"
              @keyup.enter="updatePassword"
              @update:error="(state) => validation.changeValidationState('passwordConfirmation', state)"
            />
          </div>

          <template #actions>
            <v-btn
              large
              block
              color="primary"
              :loading="requestActive"
              :disabled="validation.hasAnyError || requestActive"
              @click="updatePassword"
            >
              Update Password
            </v-btn>
          </template>
        </ui-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, {
  ruleRequired,
  ruleMinLength,
  ruleIsEqual,
} from '~/application/services/validationService';

interface ComponentData {
  requestActive: boolean;
  validation: Validation;
  password: string;
  passwordConfirmation: string;
  showPassword: boolean;
  showPasswordConfirmation: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      requestActive: false,
      validation: new Validation(),
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      showPasswordConfirmation: false,
    };
  },
  created() {
    this.loadValidation();
  },
  methods: {
    async updatePassword(): Promise<void> {
      if (!this.validation.hasAnyError && this.password && this.passwordConfirmation) {
        try {
          this.requestActive = true;

          await this.$fire.auth.currentUser?.updatePassword(this.password);
          this.password = '';
          this.passwordConfirmation = '';
          this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Password Updated Successfully');
          this.resetValidation();
        } catch (e) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
        } finally {
          this.requestActive = false;
        }
      }
    },
    loadValidation(): void {
      this.validation.addRule('password', (value: string) => ruleRequired(value));
      this.validation.addRule('password', (value: string) => ruleMinLength(value, 6));
      this.validation.addRule('passwordConfirmation', (value: string) => ruleRequired(value));
      this.validation.addRule('passwordConfirmation', (value: string) => ruleMinLength(value, 6));
      this.validation.addRule('passwordConfirmation', (value: string) => ruleIsEqual(value, this.password));
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
