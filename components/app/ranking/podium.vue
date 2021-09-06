<template>
  <v-container>
    <v-row
      no-gutters
      class="py-1"
    >
      <v-col
        cols="4"
        class="d-flex align-center justify-center"
      >
        <v-icon
          color="gold"
          size="32"
        >
          mdi-medal
        </v-icon>
      </v-col>
      <v-col
        cols="8"
        class="d-flex align-center"
      >
        <ui-avatar
          :photo-url="$store.state.user.user.systemInfo.photoUrl"
          size="52"
        />
        <v-chip>24500</v-chip>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="py-1"
    >
      <v-col
        cols="4"
        class="d-flex align-center justify-center"
      >
        <v-icon
          color="silver"
        >
          mdi-medal
        </v-icon>
      </v-col>
      <v-col
        cols="8"
        class="d-flex align-center justify-center"
      >
        <ui-avatar
          :photo-url="$store.state.user.user.systemInfo.photoUrl"
          size="32"
        />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="py-1"
    >
      <v-col
        cols="4"
        class="d-flex align-center justify-center"
      >
        <v-icon
          color="bronze"
        >
          mdi-medal
        </v-icon>
      </v-col>
      <v-col
        cols="8"
        class="d-flex align-center justify-center"
      >
        <ui-avatar
          :photo-url="$store.state.user.user.systemInfo.photoUrl"
          size="32"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Podium from '~/application/domain/ranking/podium';

export default Vue.extend({
  props: {
    podium: { type: Podium, required: true },
  },
});
</script>

<style scoped lang="scss">

</style>
