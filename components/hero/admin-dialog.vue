<template>
  <div>
    <app-dialog
      :value="value"
      :title="currentHero.id ? currentHero.id : 'New Hero'"
      @input="cancel"
    >
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

interface ComponentData {
  currentHero: Hero;
}

export default Vue.extend({
  props: {
    hero: { type: Hero, required: false, default: () => new Hero() },
    value: { type: Boolean, required: true },
  },
  data(): ComponentData {
    return {
      currentHero: new Hero(),
    };
  },
  created(): void {
    this.currentHero = this.hero || new Hero();
  },
  updated(): void {
    this.currentHero = this.hero || new Hero();
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.currentHero = this.hero;
    },
    saveUpdate(): void {
      // TODO save
      this.$emit('input', false);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
