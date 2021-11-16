<template>
  <article>
    <ui-sub-header text="Preferences" />
    <v-slider
      label="Priority"
      thumb-label="always"
      ticks
      :thumb-size="24"
      min="0"
      max="4"
      class="mt-10"
      track-color="none"
      :color="priorityColor"
      :track-fill-color="priorityColor"
      :value="$store.state.hero.hero.playerInfo.priority"
      @input="(value) => $store.commit('hero/SET_PLAYER_INFO_PRIORITY', value)"
    >
      <template #thumb-label="props">
        <span :class="`${$store.state.hero.hero.playerInfo.priority === 4 ? 'black--text' : ''}`"> {{ formatPriorityLabel(props.value) }}</span>
      </template>
    </v-slider>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadPriorityLabel } from '~/application/services/textService';
import { getPriorityColor } from '~/application/services/resource/resourcePriorityService';

export default Vue.extend({
  computed: {
    priorityColor(): string {
      return getPriorityColor(this.$store.state.hero.hero.playerInfo.priority);
    },
  },
  methods: {
    formatPriorityLabel(value: number): string {
      return loadPriorityLabel(value);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
