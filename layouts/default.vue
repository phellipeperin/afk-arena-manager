<template>
  <v-app>
    <div class="app-content">
      <app-navigation-drawer />

      <v-main>
        <v-container>
          <Nuxt />
          <app-snackbar />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
