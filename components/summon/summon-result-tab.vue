<template>
  <article>
    <template>
      <ui-sub-header text="Actions" />
      <div class="d-flex">
        <v-btn
          color="accent"
          @click="askConfirmation"
        >
          Confirm and Finish
        </v-btn>
      </div>
    </template>

    <v-divider class="my-4" />

    <ui-sub-header text="Result" />
    <summon-result-list
      :result="data"
      @changeHeroAscension="({ heroId, ascension }) => changeHeroAscension(heroId, ascension)"
    />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon, { SummonStatus } from '~/application/domain/summon/summon';
import SummonResult from '~/application/domain/summon/summonResult';
import SummonResultHero from '~/application/domain/summon/summonResultHero';
import { generateSummonResult } from '~/application/services/summon/summonResult';
import { Ascension } from '~/application/domain/info/ascension';

interface ComponentData {
  data: SummonResult;
}

export default Vue.extend({
  props: {
    summon: { type: Summon, required: true },
  },
  data(): ComponentData {
    return {
      data: new SummonResult(),
    };
  },
  created(): void {
    this.data = generateSummonResult(this.summon.data, this.$store.getters['hero/baseHeroList'](this.$store.state.user.user.id));
  },
  methods: {
    changeHeroAscension(heroId: string, ascension: Ascension): void {
      const index = this.data.items.findIndex((elem: SummonResultHero) => elem.finalHero.id === heroId);
      if (index !== -1) {
        this.data.items[index].finalHero.playerInfo.ascension = ascension;
      }
    },
    askConfirmation(): void {
      this.$store.commit('feedback/ASK_FOR_CONFIRMATION', {
        title: 'Finish Summon',
        message: `Are you sure you want to complete the summon of ${this.summon.label}? After finishing, the changes above will be applied to your heroes and this tab will be removed. So, take a screenshot before confirming if you wish.`,
        callback: this.confirm,
      });
    },
    async confirm(): Promise<void> {
      const summonDocRef = this.$fire.firestore.collection(`users/${this.$store.state.user.user.id}/summons`).doc(this.summon.id);
      await summonDocRef.update({
        status: SummonStatus.DONE,
      });
      // TODO apply changes to heroes
      this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Summon finished. Hero changes applied.');
      this.$store.commit('system/SET_PAGE_STATE_SELECTED_TAB', 0);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
