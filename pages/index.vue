<template>
  <ui-card class="login-card">
    <v-row
      no-gutters
      class="login-card--row login-card--row--background d-none d-sm-block"
    >
      <v-col
        cols="12"
        sm="6"
        md="7"
        :offset-sm="isOnLogin ? 0 : 6"
        :offset-md="isOnLogin ? 0 : 5"
        :class="`login-card--info ${isOnLogin ? 'state' : 'signup-state'}`"
      >
        <div class="login-card--info--background" />
        <div class="login-card--info--content">
          <h2 class="text-h2 white--text mb-8">
            AFK Arena Manager
          </h2>
          <v-btn
            outlined
            rounded
            x-large
            color="white"
            :disabled="requestActive"
            @click="toggleFormStatus"
          >
            {{ isOnLogin ? 'Create Account' : 'Go to Login' }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="login-card--row"
    >
      <v-col
        cols="12"
        sm="6"
        md="5"
        :offset-sm="isOnLogin ? 6 : 0"
        :offset-md="isOnLogin ? 7 : 0"
        :class="`login-card--form ${$vuetify.breakpoint.xsOnly ? 'login-card--form__mobile' : ''}`"
      >
        <transition name="fade">
          <v-form
            v-show="isOnLogin"
            class="form"
          >
            <h4 class="text-h4 mb-4 text-left">
              Welcome
            </h4>
            <v-text-field
              v-model="user.email"
              autofocus
              label="Email"
              :rules="validation.getRules('email')"
              @update:error="(state) => validation.changeValidationState('email', state)"
            />
            <v-text-field
              v-model="user.password"
              label="Password"
              hint="Minimum 6 characters"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validation.getRules('password')"
              @click:append="showPassword = !showPassword"
              @update:error="(state) => validation.changeValidationState('password', state)"
            />
            <v-btn
              large
              block
              color="primary"
              class="text--white"
              :loading="requestActive"
              :disabled="isLoginDisabled || requestActive"
              @click="login"
            >
              Login
            </v-btn>
          </v-form>
        </transition>

        <transition name="fade">
          <v-form
            v-show="!isOnLogin"
            class="form"
          >
            <h4 class="text-h4 mb-4 text-left">
              Create Account
            </h4>
            <v-text-field
              v-model="user.email"
              autofocus
              label="Email"
              :rules="validation.getRules('email')"
              @update:error="(state) => validation.changeValidationState('email', state)"
            />
            <v-text-field
              v-model="user.password"
              label="Password"
              hint="Minimum 6 characters"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validation.getRules('password')"
              @click:append="showPassword = !showPassword"
              @update:error="(state) => validation.changeValidationState('password', state)"
            />
            <v-text-field
              v-model="user.passwordConfirmation"
              label="Confirm Password"
              hint="Minimum 6 characters. Must match password."
              :type="showPasswordConfirmation ? 'text' : 'password'"
              :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validation.getRules('passwordConfirmation')"
              @click:append="showPasswordConfirmation = !showPasswordConfirmation"
              @update:error="(state) => validation.changeValidationState('passwordConfirmation', state)"
            />
            <v-btn
              large
              block
              color="primary"
              class="text--white"
              :loading="requestActive"
              :disabled="isSignupDisabled || requestActive"
              @click="createAccount"
            >
              Create Account
            </v-btn>
          </v-form>
        </transition>
      </v-col>

      <v-col
        cols="12"
        class="login-card--info login-card--info__mobile d-block d-sm-none"
      >
        <div class="login-card--info--background" />
        <div class="login-card--info--content">
          <h4 class="text-h4 white--text mb-8">
            AFK Arena Manager
          </h4>
          <v-btn
            outlined
            rounded
            x-large
            color="white"
            :disabled="requestActive"
            @click="toggleFormStatus"
          >
            {{ isOnLogin ? 'Create Account' : 'Go to Login' }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </ui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleRequired, ruleIsEmail, ruleMinLength, ruleIsEqual } from '~/application/services/validationService';

enum FormType {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

class AuthUser {
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor() {
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }
}

interface ComponentData {
  formStatus: FormType;
  user: AuthUser;
  validation: Validation;
  showPassword: boolean;
  showPasswordConfirmation: boolean;
  requestActive: boolean;
  interval: any;
}

export default Vue.extend({
  layout: 'public-layout',
  meta: {
    public: true,
  },
  data(): ComponentData {
    return {
      formStatus: FormType.LOGIN,
      user: new AuthUser(),
      validation: new Validation(),
      showPassword: false,
      showPasswordConfirmation: false,
      requestActive: false,
      interval: null,
    };
  },
  computed: {
    isOnLogin(): boolean {
      return this.formStatus === FormType.LOGIN;
    },
    isLoginDisabled(): boolean {
      return this.validation.hasAnyError || !this.user.email || !this.user.password;
    },
    isSignupDisabled(): boolean {
      return this.isLoginDisabled || !this.user.passwordConfirmation;
    },
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    async createAccount(): Promise<void> {
      await this.tryToDoAction(async() => {
        await this.$fire.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      });
    },
    async login(): Promise<void> {
      await this.tryToDoAction(async() => {
        await this.$fire.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      });
    },
    async tryToDoAction(action: Function): Promise<void> {
      if (!this.validation.hasAnyRule) {
        this.loadValidation();
      }
      if (!this.validation.hasAnyError) {
        try {
          this.requestActive = true;
          await action();
          this.interval = setInterval(async() => {
            if (this.$store.state.user.isUserLoaded) {
              this.requestActive = false;
              await this.$nuxt.$router.push('/player/heroes');
            }
          }, 100);
        } catch (e) {
          this.requestActive = false;
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
        }
      }
    },
    loadValidation(): void {
      this.validation.addRule('email', (value: string) => ruleRequired(value));
      this.validation.addRule('email', (value: string) => ruleIsEmail(value));
      this.validation.addRule('password', (value: string) => ruleRequired(value));
      this.validation.addRule('password', (value: string) => ruleMinLength(value, 6));
      this.validation.addRule('passwordConfirmation', (value: string) => ruleRequired(value));
      this.validation.addRule('passwordConfirmation', (value: string) => ruleMinLength(value, 6));
      this.validation.addRule('passwordConfirmation', (value: string) => ruleIsEqual(value, this.user.password));
      this.$forceUpdate();
    },
    toggleFormStatus(): void {
      this.validation.clear();
      this.user = new AuthUser();
      this.showPassword = false;
      this.showPasswordConfirmation = false;
      if (this.formStatus === FormType.LOGIN) {
        this.formStatus = FormType.SIGNUP;
      } else {
        this.formStatus = FormType.LOGIN;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "~/assets/styles/mixins.scss";

.login-card {
  height: 720px;
  position: relative;

  &--row {
    height: 100%;
    width: 100%;

    &--background {
      position: absolute;
      left: 0;
    }
  }

  &--info {
    height: 100%;
    position: relative;
    @include gradientBg();
    z-index: 9;
    transition: all ease 1s;

    &.state {
      border-radius: 24px 0 0 4px;
    }

    &.signup-state {
      border-radius: 0 4px 24px 0;
    }

    &--background {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 24px 0 24px 0;
      background-image: url('~/assets/images/banner-login.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position-x: 50%;
      filter: grayscale(1);
      opacity: 0.1;
      transition: all ease 1s;
    }

    &--content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    &__mobile {
      border-radius: 0 0 24px 4px;
      height: 40%;
    }
  }

  &--form {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out 0.8s;

    &__mobile {
      height: 60%;
    }
  }
}

.form {
  position: absolute;
  width: 65%;
}

.fade-enter-active {
  transition: opacity ease .4s .3s;
}
.fade-leave-active {
  transition: opacity ease .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
