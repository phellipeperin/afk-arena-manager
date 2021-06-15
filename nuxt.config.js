const firebaseModuleConfig = {
  config: {
    apiKey: 'AIzaSyByDhCiTtEx01mIQtvJ4Rhbe7_w8iuNx_4',
    authDomain: 'afk-arena-manager.firebaseapp.com',
    projectId: 'afk-arena-manager',
    storageBucket: 'afk-arena-manager.appspot.com',
    messagingSenderId: '197284538342',
    appId: '1:197284538342:web:cd8c901416c6611b579827',
  },
  services: {
    firestore: true,
    auth: {
      initialize: {
        // onIdTokenChangedMutation: 'user/AUTH_STATE_CHANGED',
        onIdTokenChangedAction: 'user/authStateChanged',
        subscribeManually: false,
      },
    },
  },
};
const googleFontsModuleConfig = {
  families: {
    'Mate+SC': true,
    'Source+Sans+Pro': true,
  },
};
const vuetifyModuleConfig = {
  theme: {
    themes: {
      light: {
        primary: '#355C7D',
        secondary: '#753a88',
        // accent: '#FFFFFF',
        error: '#f22613',
      },
    },
  },
};

export default {
  ssr: false,
  target: 'static',
  components: true,
  head: {
    title: 'AFK Arena Manager',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [
    '~/assets/styles/colors.scss',
    '~/assets/styles/fonts.scss',
    '~/assets/styles/globals.scss',
    '~/assets/styles/override.scss',
  ],
  plugins: [],
  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/firebase', firebaseModuleConfig],
    ['@nuxtjs/google-fonts', googleFontsModuleConfig],
    ['@nuxtjs/vuetify', vuetifyModuleConfig],
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {},
  build: {},
  router: {
    middleware: ['router-auth'],
  },
};
