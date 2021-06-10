<template>
  <v-card
    elevation="0"
    shaped
    class="card"
  >
    <v-row
      no-gutters
      class="card--row card--row--background"
    >
      <v-col
        cols="12"
        md="7"
        :offset-md="isOnLogin ? 0 : 5"
        :class="`card--info ${isOnLogin ? 'state' : 'signup-state'}`"
      >
        <div class="card--info--background" />
        <div class="card--info--content">
          <h2 class="text-h2 accent--text mb-8">
            AFK Arena Manager
          </h2>
          <v-btn
            outlined
            rounded
            x-large
            color="accent"
            @click="toggleFormStatus"
          >
            {{ isOnLogin ? 'Create Account' : 'Go to Login' }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="card--row"
    >
      <v-col
        cols="12"
        md="5"
        :offset-md="isOnLogin ? 7 : 0"
        class="card--form"
      >
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
          />
          <v-text-field
            v-model="user.password"
            label="Password"
          />
          <v-btn
            large
            block
            color="primary"
          >
            Login
          </v-btn>
        </v-form>

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
          />
          <v-text-field
            v-model="user.password"
            label="Password"
          />
          <v-text-field
            v-model="user.passwordConfirmation"
            label="Confirm Password"
          />
          <v-btn
            large
            block
            color="primary"
          >
            Create Account
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

enum FormType {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

class AuthUser {
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor () {
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }
}

interface ComponentData {
  formStatus: FormType,
  user: AuthUser,
}

export default Vue.extend({
  layout: 'public',
  data (): ComponentData {
    return {
      formStatus: FormType.LOGIN,
      user: new AuthUser(),
    };
  },
  computed: {
    isOnLogin (): boolean {
      return this.formStatus === FormType.LOGIN;
    },
  },
  methods: {
    toggleFormStatus (): void {
      this.user = new AuthUser();
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
.card {
  height: 720px;
  animation: 1s appear;
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
    background: rgb(204,43,94);
    background: linear-gradient(
      135deg,
      rgba(204, 43, 94, 1) 0%,
      rgba(117, 58, 136, 1) 100%
    );
    z-index: 9;
    transition: all ease 1s;

    &.state {
      border-radius: 24px 0 0 0;
    }

    &.signup-state {
      border-radius: 0 0 24px 0;
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
  }

  &--form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out 0.8s;
  }
}

.form {
  width: 60%;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
