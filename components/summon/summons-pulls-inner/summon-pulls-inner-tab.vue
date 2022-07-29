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
    changeTotal(newValue: number): void {
      const newPulls = this.createNewSummonPullsItem();
      newPulls.total = newTotal;
      this.$emit('update', newPulls);
    },
    changeElite(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      // TODO
      this.$emit('update', newPulls);
    },
    changeStar(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      // TODO
      this.$emit('update', newPulls);
    },
    changeAwakened(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      // TODO
      this.$emit('update', newPulls);
    },
    changeMythicFurniture(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      // TODO
      this.$emit('update', newPulls);
    },
    changeCardHeroes(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      // TODO
      this.$emit('update', newPulls);
    },
    changeCardFurniture(newSize: number): void {
      const newPulls = this.createNewSummonPullsItem();
      // TODO
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
