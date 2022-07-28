<template>
  <v-banner single-line>
    <span class="text-h6">{{ summon.label }}</span>

    <template #actions>
      <v-btn
        small
        text
        color="accent"
        @click="view"
      >
        View Details
      </v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon from '~/application/domain/summon/summon';

export default Vue.extend({
  props: {
    summon: { type: Summon, required: true },
  },
  methods: {
    view(): void {
      this.$nuxt.$router.push(`/player/summons/${this.summon.id}`);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
