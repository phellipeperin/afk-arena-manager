<template>
  <div>
    <app-dialog
      :value="value"
      :title="$store.state.hero.hero.gameInfo.name"
      max-width="900"
      @input="cancel"
    >
      <hero-player-form
        ref="heroForm"
        :key="$store.state.hero.hero.id"
        :hero="$store.state.hero.hero"
        :group-id="groupId"
        @saved="saved"
      />

      <template #toolbar-info>
        <ui-avatar
          rounded
          :photo-url="heroImage"
          size="112"
          class="hero-avatar-modal"
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
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.$store.commit('hero/SET_HERO', new Hero());
    },
    async saveUpdate(): Promise<void> {
      await (this.$refs.heroForm as any).saveUpdate();
    },
    saved(): void {
      this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Hero Saved Successfully');
      this.cancel();
    },
  },
});
</script>

<style scoped lang="scss">
.hero-avatar-modal {
  position: absolute;
  right: 12px;
  top: 0;
}
</style>
