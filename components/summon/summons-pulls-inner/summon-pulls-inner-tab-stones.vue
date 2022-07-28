<template>
  <article>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <ui-sub-header text="Purple Soul Stones" />
          Purple Soul Stones
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon from '~/application/domain/summon/summon';

interface ComponentData {}

export default Vue.extend({
  props: {
    summon: { type: Summon, required: true },
  },
  data(): ComponentData {
    return {};
  },
});
</script>

<style scoped lang="scss">

</style>
