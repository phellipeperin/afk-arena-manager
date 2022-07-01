<template>
  <div>
    <app-dialog
      :value="value"
      :title="$store.state.hero.hero.gameInfo.name"
      max-width="900"
      @input="cancel"
    >
      <hero-player-form
        :key="$store.state.hero.hero.id"
        :simple="simple"
      />

      <template #toolbar-info>
        <ui-avatar
          rounded
          :photo-url="heroImage"
          size="52"
        />
      </template>

      <template #actions>
        <v-btn
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="accent"
          @click="saveUpdate"
        >
          Save
        </v-btn>
      </template>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { loadHeroImage } from '~/application/services/hero/heroService';

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
    simple: { type: Boolean, required: false, default: false },
  },
  computed: {
    heroImage(): string {
      return loadHeroImage(this.$store.state.hero.hero);
    },
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.$store.commit('hero/SET_HERO', new Hero());
    },
    async saveUpdate(): Promise<void> {
      const userId = this.$store.state.user.user.id;
      const heroId = this.$store.state.hero.hero.id;
      try {
        const docRef = this.$fire.firestore.collection(`users/${userId}/heroes`).doc(heroId);
        await docRef.update(JSON.parse(JSON.stringify(this.$store.state.hero.hero.playerInfo)));
        this.$emit('input', false);
        this.$store.commit('hero/UPDATE_PLAYER_HERO', { id: this.$store.state.user.user.id, hero: this.$store.state.hero.hero });
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Hero Saved Successfully');
        this.$store.commit('hero/SET_HERO', new Hero());
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      }
    },
  },
});
</script>

<style scoped lang="scss">

</style>
