<template>
  <article class="d-flex align-center justify-center">
    <ui-resource-quantity
      v-if="resources.copiesElite"
      :image-src="copyEliteImage"
      :amount="resources.copiesElite"
    />
    <ui-resource-quantity
      v-if="resources.copiesLegendary"
      :image-src="copyLegendaryImage"
      :amount="resources.copiesLegendary"
    />
    <ui-resource-quantity
      v-if="resources.sacs"
      :image-src="sacImage"
      :amount="resources.sacs"
    />
    <ui-resource-quantity
      v-if="resources.eliteEmblem"
      :image-src="eliteEmblemImage"
      :amount="resources.eliteEmblem"
    />
    <ui-resource-quantity
      v-if="resources.legendaryEmblem"
      :image-src="legendaryEmblemImage"
      :amount="resources.legendaryEmblem"
    />
    <ui-resource-quantity
      v-if="resources.mythicEmblem"
      :image-src="mythicEmblemImage"
      :amount="resources.mythicEmblem"
    />
    <ui-resource-quantity
      v-if="resources.poeCoin"
      :image-src="poeCoinImage"
      :amount="resources.poeCoin"
    />
    <ui-resource-quantity
      v-if="resources.shards"
      :image-src="elementalShardImage"
      :amount="resources.shards"
    />
    <ui-resource-quantity
      v-if="resources.cores"
      :image-src="elementalCoreImage"
      :amount="resources.cores"
    />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  loadEmblemsImage,
  loadEngraveImage,
  loadPoeCoinImage,
  loadEliteCopyImage,
  loadLegendaryCopyImage,
  loadEliteSacImage,
} from '~/application/services/imageService';
import { Ascension } from '~/application/domain/info/ascension';
import { Engrave } from '~/application/domain/info/engrave';

export default Vue.extend({
  props: {
    resources: { type: Object, required: true },
    faction: { type: String, required: false, default: '' },
  },
  computed: {
    copyEliteImage() {
      return loadEliteCopyImage();
    },
    copyLegendaryImage() {
      return loadLegendaryCopyImage();
    },
    sacImage() {
      return loadEliteSacImage();
    },
    eliteEmblemImage() {
      return loadEmblemsImage(Ascension.Elite);
    },
    legendaryEmblemImage() {
      return loadEmblemsImage(Ascension.Legendary);
    },
    mythicEmblemImage() {
      if (this.faction) {
        return loadEmblemsImage(Ascension.Mythic, this.faction);
      }
      return loadEmblemsImage(Ascension.Mythic);
    },
    poeCoinImage() {
      return loadPoeCoinImage();
    },
    elementalShardImage() {
      return loadEngraveImage(Engrave.Shard);
    },
    elementalCoreImage() {
      return loadEngraveImage(Engrave.Core);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
