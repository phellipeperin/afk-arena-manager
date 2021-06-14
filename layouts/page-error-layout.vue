<template>
  <v-app>
    <div class="app-content">
      <v-main>
        <v-container>
          <ui-card class="page-error-card">
            <v-row
              no-gutters
              class="page-error-card--row"
            >
              <v-col
                cols="12"
                sm="5"
                :class="`image-container ${$vuetify.breakpoint.xsOnly ? 'image-container__mobile' : ''}`"
                :order="$vuetify.breakpoint.xsOnly ? 2 : 1"
              >
                <img
                  alt="Lord Dreaf"
                  src="~/assets/images/dreaf.png"
                >
              </v-col>
              <v-col
                cols="12"
                sm="7"
                class="content-container px-6 py-4"
                :order="$vuetify.breakpoint.xsOnly ? 1 : 2"
              >
                <Nuxt />
              </v-col>
            </v-row>
          </ui-card>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.page-error-card {
  height: 420px;
  position: relative;

  &--row {
    height: 100%;
  }
}

.image-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 24px 0 0 4px;
  position: relative;
  background: #355C7D;
  background: linear-gradient(
      135deg,
      #355C7D 0%,
      #753a88 100%
  );

  &__mobile {
    border-radius: 0 0 24px 4px;
  }

  img {
    height: 80%;
  }
}

.content-container {
  display: flex;
  align-items: center;
}
</style>
