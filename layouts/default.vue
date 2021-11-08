<template>
  <v-app>
    <div class="app-content">
      <app-navigation-drawer />

      <v-main class="app-main">
        <v-container
          fluid
          class="app-container px-5 py-4"
        >
          <Nuxt />
          <app-snackbar />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.app-main,
.app-container {
  height: 100%;
}
</style>
