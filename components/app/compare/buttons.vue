<template>
  <div>
    <v-btn
      v-if="onCompare"
      outlined
      color="primary"
      @click="() => setState(false)"
    >
      Cancel Compare
    </v-btn>
    <v-btn
      v-if="!onCompare"
      raised
      color="primary"
      @click="() => setState(true)"
    >
      Compare with Friends
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    onCompare: { type: Boolean, required: true },
  },
  methods: {
    setState(state: boolean): void {
      this.$emit('update', state);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
