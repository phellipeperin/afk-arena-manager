<template>
  <div>
    <app-dialog
      :value="value"
      :title="$store.state.hero.hero.gameInfo.name || 'New Hero'"
      max-width="1200"
      @input="cancel"
    >
      <hero-admin-form :validation="validation" />

      <template #actions>
        <v-btn
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="accent"
          :disabled="!canSave"
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
import Validation, { ruleRequired } from '~/application/services/validationService';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  validation: Validation;
}

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
  },
  data(): ComponentData {
    return {
      validation: new Validation(),
    };
  },
  computed: {
    canSave(): boolean {
      const { gameInfo } = this.$store.state.hero.hero;
      return !this.validation.hasAnyError && gameInfo.name && gameInfo.title;
    },
  },
  created(): void {
    this.loadValidation();
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.$store.commit('hero/SET_HERO', new Hero());
      this.resetValidation();
    },
    async saveUpdate(): Promise<void> {
      if (!this.validation.hasAnyError) {
        const heroId = this.$store.state.hero.hero.id;
        try {
          const docRef = this.$fire.firestore.collection('heroes').doc(heroId);
          const heroData = {
            gameInfo: JSON.parse(JSON.stringify(this.$store.state.hero.hero.gameInfo)),
            systemInfo: JSON.parse(JSON.stringify(this.$store.state.hero.hero.systemInfo)),
          };
          await docRef.set(heroData);
          this.$emit('input', false);
          this.$store.commit('hero/UPDATE_HERO', new Hero(heroId, heroData.gameInfo, heroData.systemInfo));
          this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Hero Saved Successfully');
          this.resetValidation();
        } catch (e) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
        }
      }
    },
    loadValidation(): void {
      this.validation.addRule('name', (value: string) => ruleRequired(value));
      this.validation.addRule('title', (value: string) => ruleRequired(value));
    },
    resetValidation(): void {
      this.validation.reset();
      this.loadValidation();
    },
  },
});
</script>

<style scoped lang="scss">

</style>
