<template>
  <v-app>
    <div class="overflow-hidden">
      <app-main-header />
      <v-sheet
        id="content"
        class="base-content overflow-y-auto"
      >
        <v-main class="">
          <Nuxt />
          <app-snackbar />
        </v-main>
      </v-sheet>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.base-content {
  height: 100vh;
  padding-top: 128px;
}
</style>
