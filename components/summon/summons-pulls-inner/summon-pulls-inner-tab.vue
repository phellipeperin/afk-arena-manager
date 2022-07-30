<template>
  <article>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <summon-pulls-inner-tab-totals
            :total="pulls.total"
            :elite="pulls.elite.length"
            :star="pulls.star.length"
            :awakened="pulls.awakened.length"
            :furniture="pulls.mythicFurniture.length"
            :card-heroes="pulls.cardHero.length"
            :card-furniture="pulls.cardFurniture.length"
            :show-total="mode !== 'STONES' && mode !== 'CARDS'"
            :show-elite="mode === 'STONES' || mode === 'SCROLLS' || mode === 'HERO_CHOICE' || mode === 'TIME_TEMPLE' || mode === 'STARGAZER'"
            :show-star="mode === 'STARGAZER'"
            :show-awakened="mode === 'SCROLLS' || mode === 'TIME_TEMPLE' || mode === 'STARGAZER'"
            :show-furniture="mode === 'FURNITURE'"
            :show-card-heroes="mode === 'CARDS'"
            :show-card-furniture="mode === 'CARDS'"
            @changeTotal="changeTotal"
            @changeElite="changeElite"
            @changeStar="changeStar"
            @changeAwakened="changeAwakened"
            @changeFurniture="changeMythicFurniture"
            @changeCardHeroes="changeCardHeroes"
            @changeCardFurniture="changeCardFurniture"
          />

          <summon-pulls-inner-tab-heroes
            :pulls="pulls"
            @updateElite="({ index, value }) => updateElite(index, value)"
            @updateStar="({ index, value }) => updateStar(index, value)"
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
    mode: { type: String, required: true, validator(value) { return ['STONES', 'SCROLLS', 'HERO_CHOICE', 'TIME_TEMPLE', 'STARGAZER', 'FURNITURE', 'CARDS'].includes(value); } },
  },
  methods: {
    // Change totals
    changeTotal(newValue: number): void {
      const newPulls = this.createNewSummonPullsItem();
      newPulls.total = newValue;
      this.$emit('update', newPulls);
    },
    changeElite(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.elite.length >= newSize) {
        newPulls.elite = newPulls.elite.slice(0, newSize);
      } else {
        newPulls.elite = [...newPulls.elite, ...Array(newSize - newPulls.elite.length).fill('')];
      }
      this.$emit('update', newPulls);
    },
    changeStar(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.star.length >= newSize) {
        newPulls.star = newPulls.star.slice(0, newSize);
      } else {
        newPulls.star = [...newPulls.star, ...Array(newSize - newPulls.star.length).fill('')];
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
    updateElite(index: number, newValue: string): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.elite.length < index + 1) {
        return;
      }
      newPulls.elite[index] = newValue;
      this.$emit('update', newPulls);
    },
    updateStar(index: number, newValue: string): void {
      const newPulls = this.createNewSummonPullsItem();
      if (newPulls.star.length < index + 1) {
        return;
      }
      newPulls.star[index] = newValue;
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
      return new SummonPullsItem(this.pulls.total, this.pulls.elite, this.pulls.star, this.pulls.awakened, this.pulls.mythicFurniture, this.pulls.cardHero, this.pulls.cardFurniture);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
