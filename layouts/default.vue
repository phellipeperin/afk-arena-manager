<template>
  <v-app>
    <div class="overflow-hidden">
      <v-app-bar
        absolute
        color="indigo darken-2"
        dark
        shrink-on-scroll
        prominent
        scroll-target="#content"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-app-bar-title>Title</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
<!--      <app-navigation-drawer />-->
      <v-sheet
        id="content"
        class="base-content overflow-y-auto"
      >
        <div style="height: 1000px;">
          <v-main>
            <Nuxt />
            <app-snackbar />
          </v-main>
        </div>
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
