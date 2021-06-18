<template>
  <div>
    <app-dialog
      :value="value"
      :title="$store.state.hero.hero.gameInfo.name"
      max-width="1200"
      @input="cancel"
    >
      <hero-player-form />

      <template #actions>
        <v-btn
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
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

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.$store.commit('hero/SET_HERO', new Hero());
    },
    async saveUpdate(): Promise<void> {
      //   const heroId = this.$store.state.hero.hero.id;
      //   try {
      //     const docRef = this.$fire.firestore.collection('heroes').doc(heroId);
      //     const heroData = {
      //       gameInfo: JSON.parse(JSON.stringify(this.$store.state.hero.hero.gameInfo)),
      //       systemInfo: JSON.parse(JSON.stringify(this.$store.state.hero.hero.systemInfo)),
      //     };
      //     await docRef.set(heroData);
      //     this.$emit('input', false);
      //     this.$store.commit('hero/UPDATE_HERO_IN_LIST', { id: heroId, ...heroData });
      //     this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Hero Saved Successfully');
      //     this.resetValidation();
      //   } catch (e) {
      //     this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      //   }
    },
  },
});
</script>

<style scoped lang="scss">

</style>
