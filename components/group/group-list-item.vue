<template>
  <v-banner single-line>
    <ui-avatar
      :photo-url="group.image"
      size="42"
    />
    <span class="text-h6 ml-2">{{ group.name }}</span>

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
import Group from '~/application/domain/group/group';

export default Vue.extend({
  props: {
    group: { type: Group, required: true },
  },
  methods: {
    view(): void {
      // TODO
    },
  },
});
</script>

<style scoped lang="scss">

</style>
