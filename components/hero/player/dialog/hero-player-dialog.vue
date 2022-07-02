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
        :simple="!!groupId"
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
    groupId: { type: String, required: false, default: '' },
  },
  computed: {
    heroImage(): string {
      return loadHeroImage(this.$store.state.hero.hero);
    },
    docRefPath(): string {
      const userId = this.$store.state.user.user.id;
      if (this.groupId) {
        if (this.groupId === 'personal') {
          return `users/${userId}/objective`;
        }
        return `groups/${this.groupId}/objective`;
      }
      return `users/${userId}/heroes`;
    },
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.$store.commit('hero/SET_HERO', new Hero());
    },
    async saveUpdate(): Promise<void> {
      const heroId = this.$store.state.hero.hero.id;
      try {
        const docRef = this.$fire.firestore.collection(this.docRefPath).doc(heroId);
        await docRef.update(JSON.parse(JSON.stringify(this.$store.state.hero.hero.playerInfo)));
        this.$emit('input', false);
        this.$store.commit(`hero/${this.groupId ? 'UPDATE_OBJECTIVE_HERO' : 'UPDATE_PLAYER_HERO'}`, { id: this.groupId || this.$store.state.user.user.id, hero: this.$store.state.hero.hero });
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
