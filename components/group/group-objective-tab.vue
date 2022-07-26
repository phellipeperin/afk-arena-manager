<template>
  <article>
    <v-container>
      <v-row>
        objective
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Group from '~/application/domain/group/group';

interface ComponentData {
}

export default Vue.extend({
  props: {
    group: { type: Group, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
    };
  },
  async created(): Promise<void> {
    // TODO
  },
  methods: {
  },
});
</script>

<style scoped lang="scss">

</style>
