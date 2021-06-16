<template>
  <form>
    <v-row>
      <v-col
        cols="12"
        sm="7"
        md="6"
      >
        <v-text-field
          :value="$store.state.hero.hero.id"
          disabled
          label="ID"
        />
        <v-text-field
          :value="$store.state.hero.hero.gameInfo.name"
          autofocus
          label="Name"
          :rules="validation.getRules('name')"
          @input="(value) => $store.commit('hero/SET_GAME_INFO_NAME', value)"
          @update:error="(state) => validation.changeValidationState('name', state)"
        />
        <v-text-field
          :value="$store.state.hero.hero.gameInfo.title"
          label="Title"
          :rules="validation.getRules('title')"
          @input="(value) => $store.commit('hero/SET_GAME_INFO_TITLE', value)"
          @update:error="(state) => validation.changeValidationState('title', state)"
        />
        <ui-image-input
          label="Profile Image URL"
          :value="$store.state.hero.hero.gameInfo.images.profile"
          :rules="validation.getRules('profileImage')"
          @input="(value) => $store.commit('hero/SET_GAME_INFO_IMAGE_PROFILE', value)"
          @update:error="(state) => validation.changeValidationState('profileImage', state)"
        />
        <ui-image-input
          label="Banner Image URL"
          :value="$store.state.hero.hero.gameInfo.images.banner"
          :rules="validation.getRules('bannerImage')"
          @input="(value) => $store.commit('hero/SET_GAME_INFO_IMAGE_BANNER', value)"
          @update:error="(state) => validation.changeValidationState('bannerImage', state)"
        />
      </v-col>
      <v-col
        cols="12"
        sm="5"
        md="6"
      >
        <ui-selector-faction
          :value="$store.state.hero.hero.gameInfo.faction"
          mandatory
          @input="(value) => $store.commit('hero/SET_GAME_INFO_FACTION', value)"
        />
      </v-col>
    </v-row>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation from '~/application/services/validationService';

export default Vue.extend({
  props: {
    validation: { type: Validation, required: true },
  },
});
</script>

<style scoped lang="scss">

</style>
