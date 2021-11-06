<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Resources Needed">
          <div class="d-flex flex-wrap">
            <ui-resource-quantity
              v-for="artifact in info.fragments"
              :key="artifact.id"
              :image-src="loadFragmentImage(artifact.id)"
              :amount="artifact.amount"
            />
            <ui-resource-quantity
              :image-src="goldImage"
              :amount="info.totalGold"
            />
          </div>
        </ui-info-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticArtifactInfo from '~/application/domain/statistic/info/statisticArtifactInfo';
import { Artifact } from '~/application/domain/resources/resourceArtifact';
import { loadArtifactFragmentImage, loadGoldImage } from '~/application/services/imageService';

export default Vue.extend({
  props: {
    info: { type: StatisticArtifactInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  computed: {
    goldImage() {
      return loadGoldImage();
    },
  },
  methods: {
    loadFragmentImage(id: Artifact): string {
      return loadArtifactFragmentImage(id);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
