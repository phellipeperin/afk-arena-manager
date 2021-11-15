<template>
  <v-app>
    <div class="app-content d-flex align-center">
      <v-main>
        <v-container>
          <Nuxt />
          <app-snackbar />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.app-content {
  height: 100vh;
}
</style>
