<template>
  <form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
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
            color="primary"
            label="Name"
            :rules="validation.getRules('name')"
            @input="(value) => $store.commit('hero/SET_GAME_INFO_NAME', value)"
            @update:error="(state) => validation.changeValidationState('name', state)"
          />
          <v-text-field
            :value="$store.state.hero.hero.gameInfo.title"
            color="primary"
            label="Title"
            :rules="validation.getRules('title')"
            @input="(value) => $store.commit('hero/SET_GAME_INFO_TITLE', value)"
            @update:error="(state) => validation.changeValidationState('title', state)"
          />
          <v-text-field
            :value="$store.state.hero.hero.systemInfo.imageUrlName"
            color="primary"
            label="Image URL Name"
            @input="(value) => $store.commit('hero/SET_SYSTEM_INFO_IMAGE_URL_NAME', value)"
          />
          <v-switch
            :input-value="$store.state.hero.hero.gameInfo.awakened"
            :true-value="true"
            :false-value="false"
            label="Awakened Version"
            color="primary"
            @change="(value) => $store.commit('hero/SET_GAME_INFO_AWAKENED', value)"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <ui-sub-header text="Classification" />
          <ui-selector-type
            :value="$store.state.hero.hero.gameInfo.type"
            show-label
            mandatory
            @input="(value) => $store.commit('hero/SET_GAME_INFO_TYPE', value)"
          />
          <ui-selector-division
            :value="$store.state.hero.hero.gameInfo.division"
            show-label
            mandatory
            @input="(value) => $store.commit('hero/SET_GAME_INFO_DIVISION', value)"
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
      </v-row>
    </v-container>
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
