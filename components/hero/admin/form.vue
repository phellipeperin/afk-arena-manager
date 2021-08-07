<template>
  <form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <ui-sub-header text="Data" />
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

          <ui-sub-header text="Classification" />
          <ui-selector-type
            :value="$store.state.hero.hero.gameInfo.type"
            show-label
            mandatory
            @input="(value) => $store.commit('hero/SET_GAME_INFO_TYPE', value)"
          />
          <ui-selector-group
            :value="$store.state.hero.hero.gameInfo.group"
            show-label
            mandatory
            @input="(value) => $store.commit('hero/SET_GAME_INFO_GROUP', value)"
          />
          <ui-selector-faction
            :value="$store.state.hero.hero.gameInfo.faction"
            show-label
            mandatory
            @input="(value) => $store.commit('hero/SET_GAME_INFO_FACTION', value)"
          />
          <ui-selector-role
            :value="$store.state.hero.hero.gameInfo.role"
            show-label
            mandatory
            @input="(value) => $store.commit('hero/SET_GAME_INFO_ROLE', value)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <ui-sub-header text="Images" />
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
          md="4"
        >
          <ui-sub-header text="Skins" />
          <hero-admin-skin
            v-for="(skin, index) in $store.state.hero.hero.gameInfo.skins"
            :key="index"
            :index="index"
            :skin="skin"
          />

          <v-btn
            text
            color="primary"
            @click="addSkin"
          >
            Add Skin
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation from '~/application/services/validationService';
import HeroSkin from '~/application/domain/hero/hero-skin';

export default Vue.extend({
  props: {
    validation: { type: Validation, required: true },
  },
  methods: {
    addSkin(): void {
      this.$store.commit('hero/SET_GAME_INFO_ADD_SKIN');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
