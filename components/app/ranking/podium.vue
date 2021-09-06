<template>
  <v-container class="podium-container">
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
        v-if="podium.first.players.length"
        cols="8"
        class="d-flex align-center"
      >
        <v-card
          v-for="player in podium.first.players"
          :key="player.systemInfo.photoUrl"
          :elevation="2"
          class="mr-1 avatar-player"
        >
          <ui-avatar
            :photo-url="player.systemInfo.photoUrl"
            size="42"
          />
        </v-card>
        <span class="ml-2 text-overline font-weight-bold">{{ podium.first.value }}</span>
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
          size="26"
        >
          mdi-medal
        </v-icon>
      </v-col>
      <v-col
        v-if="podium.second.players.length"
        cols="8"
        class="d-flex align-center"
      >
        <v-card
          v-for="player in podium.second.players"
          :key="player.systemInfo.photoUrl"
          :elevation="2"
          class="mr-1 avatar-player"
        >
          <ui-avatar
            :photo-url="player.systemInfo.photoUrl"
            size="32"
          />
        </v-card>
        <span class="ml-2 text-overline font-weight-medium">{{ podium.second.value }}</span>
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
          size="26"
        >
          mdi-medal
        </v-icon>
      </v-col>
      <v-col
        v-if="podium.third.players.length"
        cols="8"
        class="d-flex align-center"
      >
        <v-card
          v-for="player in podium.third.players"
          :key="player.systemInfo.photoUrl"
          :elevation="2"
          class="mr-1 avatar-player"
        >
          <ui-avatar
            :photo-url="player.systemInfo.photoUrl"
            size="32"
          />
        </v-card>
        <span class="ml-2 text-overline font-weight-medium">{{ podium.third.value }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Podium from '~/application/domain/ranking/podium';

export default Vue.extend({
  props: {
    podium: { type: Podium, required: true },
  },
});
</script>

<style scoped lang="scss">
.avatar-player {
  border-radius: 50%;
}
</style>
