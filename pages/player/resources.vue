<template>
  <div>
    <ui-page-header title="Resources" />

    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <ui-card title="Elder Tree">
            <resources-elder-tree-container />
          </ui-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
    };
  },
  methods: {

  },
});
</script>

<style scoped lang="scss">

</style>
