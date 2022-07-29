<template>
  <article>
    <ui-sub-header text="Result" />

    <template v-if="summon.status === 'VALIDATING'">
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
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon, { SummonStatus } from '~/application/domain/summon/summon';

interface ComponentData {}

export default Vue.extend({
  props: {
    summon: { type: Summon, required: true },
  },
  data(): ComponentData {
    return {};
  },
  methods: {
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