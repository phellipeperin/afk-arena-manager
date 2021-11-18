<template>
  <app-dialog
    :value="value"
    title="Swap Equipments"
    max-width="1200"
    @input="cancel"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="5">
          {{ hero1 }}
        </v-col>
        <v-col cols="2">
          {{ hero1 }}
        </v-col>
        <v-col cols="5">
          {{ hero2 }}
        </v-col>
      </v-row>
    </v-container>
  </app-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
    hero1: { type: Hero, required: true },
    hero2: { type: Hero, required: true },
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
