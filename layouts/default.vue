<template>
  <v-app>
    <main class="overflow-hidden">
      <app-main-header />
      <v-sheet
        id="content"
        class="app-content overflow-y-auto"
      >
        <v-main>
          <Nuxt />
          <app-snackbar />
        </v-main>
      </v-sheet>
    </main>
  </v-app>
</template>

<style scoped lang="scss">
.app-content {
  height: 100vh;
  padding-top: 128px;
}
</style>
