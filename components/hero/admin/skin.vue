<template>
  <v-row>
    <v-col
      cols="12"
      lg="4"
    >
      <ui-image-input
        label="Image URL"
        :value="skin.profileImage"
        @input="(value) => $store.commit('hero/SET_GAME_INFO_SKIN_IMAGE', { pos: index, imageUrl: value })"
      />
    </v-col>
    <v-col
      cols="10"
      lg="4"
    >
      <v-text-field
        :value="skin.name"
        color="secondary"
        label="Name"
        @input="(value) => $store.commit('hero/SET_GAME_INFO_SKIN_NAME', { pos: index, name: value })"
      />
    </v-col>
    <v-col
      cols="2"
      class="d-flex align-center"
    >
      <v-btn
        outlined
        icon
        small
        color="error"
        @click="remove"
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    skin: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  methods: {
    remove(): void {
      this.$store.commit('hero/SET_GAME_INFO_REMOVE_SKIN', this.index);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
