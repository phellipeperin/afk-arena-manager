<template>
  <article>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <summon-pulls-inner-tab-totals
            :disabled="disabled"
            :total="pulls.total"
            :normal="pulls.normal.length"
            :celepogean="pulls.celepogean.length"
            :awakened="pulls.awakened.length"
            :furniture="pulls.mythicFurniture.length"
            :card-heroes="pulls.cardHero.length"
            :card-furniture="pulls.cardFurniture.length"
            :show-total="mode !== 'CARDS'"
            :show-normal="mode === 'STONES' || mode === 'SCROLLS' || mode === 'HERO_CHOICE' || mode === 'TIME_TEMPLE' || mode === 'STARGAZER'"
            :show-celepogean="mode === 'STONES' || mode === 'SCROLLS' || mode === 'STARGAZER'"
            :show-awakened="mode === 'SCROLLS' || mode === 'TIME_TEMPLE' || mode === 'STARGAZER'"
            :show-furniture="mode === 'FURNITURE'"
            :show-card-heroes="mode === 'CARDS'"
            :show-card-furniture="mode === 'CARDS'"
            @changeTotal="changeTotal"
            @changeNormal="changeNormal"
            @changeCelepogean="changeCelepogean"
            @changeAwakened="changeAwakened"
            @changeFurniture="changeMythicFurniture"
            @changeCardHeroes="changeCardHeroes"
            @changeCardFurniture="changeCardFurniture"
          />

          <summon-pulls-inner-tab-heroes
            :pulls="pulls"
            :disabled="disabled"
            @updateNormal="({ index, value }) => updateNormal(index, value)"
            @updateCelepogean="({ index, value }) => updateCelepogean(index, value)"
            @updateAwakened="({ index, value }) => updateAwakened(index, value)"
            @updateMythicFurniture="({ index, value }) => updateMythicFurniture(index, value)"
            @updateCardHero="({ index, value }) => updateCardHero(index, value)"
            @updateCardFurniture="({ index, value }) => updateCardFurniture(index, value)"
          />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import SummonPullsItem from '~/application/domain/summon/summonPullsItem';

export default Vue.extend({
  props: {
    pulls: { type: SummonPullsItem, required: true },
    disabled: { type: Boolean, required: false, default: false },
    mode: { type: String, required: true, validator(value) { return ['STONES', 'SCROLLS', 'HERO_CHOICE', 'TIME_TEMPLE', 'STARGAZER', 'FURNITURE', 'CARDS'].includes(value); } },
  },
  methods: {
    // Change totals
    changeTotal(newValue: number): void {
      const newPulls = this.createNewSummonPullsItem();
      newPulls.total = newValue;
      this.$emit('update', newPulls);
    },
    changeNormal(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.normal.length >= newSize) {
        newPulls.normal = newPulls.normal.slice(0, newSize);
      } else {
        newPulls.normal = [...newPulls.normal, ...Array(newSize - newPulls.normal.length).fill('')];
      }
      this.$emit('update', newPulls);
    },
    changeCelepogean(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.celepogean.length >= newSize) {
        newPulls.celepogean = newPulls.celepogean.slice(0, newSize);
      } else {
        newPulls.celepogean = [...newPulls.celepogean, ...Array(newSize - newPulls.celepogean.length).fill('')];
      }
      this.$emit('update', newPulls);
    },
    changeAwakened(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.awakened.length >= newSize) {
        newPulls.awakened = newPulls.awakened.slice(0, newSize);
      } else {
        newPulls.awakened = [...newPulls.awakened, ...Array(newSize - newPulls.awakened.length).fill('')];
      }
      this.$emit('update', newPulls);
    },
    changeMythicFurniture(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.mythicFurniture.length >= newSize) {
        newPulls.mythicFurniture = newPulls.mythicFurniture.slice(0, newSize);
      } else {
        newPulls.mythicFurniture = [...newPulls.mythicFurniture, ...Array(newSize - newPulls.mythicFurniture.length).fill('')];
      }
      this.$emit('update', newPulls);
    },
    changeCardHeroes(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.cardHero.length >= newSize) {
        newPulls.cardHero = newPulls.cardHero.slice(0, newSize);
      } else {
        newPulls.cardHero = [...newPulls.cardHero, ...Array(newSize - newPulls.cardHero.length).fill('')];
      }
      this.$emit('update', newPulls);
    },
    changeCardFurniture(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.cardFurniture.length >= newSize) {
        newPulls.cardFurniture = newPulls.cardFurniture.slice(0, newSize);
      } else {
        newPulls.cardFurniture = [...newPulls.cardFurniture, ...Array(newSize - newPulls.cardFurniture.length).fill('')];
      }
      this.$emit('update', newPulls);
    },
    // Update Heroes
    updateNormal(index: number, newValue: string): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.normal.length < index + 1) {
        return;
      }
      newPulls.normal[index] = newValue;
      this.$emit('update', newPulls);
    },
    updateCelepogean(index: number, newValue: string): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.celepogean.length < index + 1) {
        return;
      }
      newPulls.celepogean[index] = newValue;
      this.$emit('update', newPulls);
    },
    updateAwakened(index: number, newValue: string): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.awakened.length < index + 1) {
        return;
      }
      newPulls.awakened[index] = newValue;
      this.$emit('update', newPulls);
    },
    updateMythicFurniture(index: number, newValue: string): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.mythicFurniture.length < index + 1) {
        return;
      }
      newPulls.mythicFurniture[index] = newValue;
      this.$emit('update', newPulls);
    },
    updateCardHero(index: number, newValue: string): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.cardHero.length < index + 1) {
        return;
      }
      newPulls.cardHero[index] = newValue;
      this.$emit('update', newPulls);
    },
    updateCardFurniture(index: number, newValue: string): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.cardFurniture.length < index + 1) {
        return;
      }
      newPulls.cardFurniture[index] = newValue;
      this.$emit('update', newPulls);
    },
    // Auxiliary
    createNewSummonPullsItem(): SummonPullsItem {
      return new SummonPullsItem(this.pulls.total, this.pulls.normal, this.pulls.celepogean, this.pulls.awakened, this.pulls.mythicFurniture, this.pulls.cardHero, this.pulls.cardFurniture);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
