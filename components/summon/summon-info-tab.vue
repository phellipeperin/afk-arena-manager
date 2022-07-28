<template>
  <article>
    <ui-sub-header text="Statistics" />

    <ui-sub-header text="Actions" />
    <div class="d-flex">
      <v-btn
        v-if="summon.status === 'IN_PROGRESS'"
        color="accent"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>
      <v-btn
        text
        color="error"
        @click="confirmToRemove"
      >
        Remove
      </v-btn>
    </div>
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
    async validate(): Promise<void> {
      const summonDocRef = this.$fire.firestore.collection(`users/${this.$store.state.user.user.id}/summons`).doc(this.summon.id);
      await summonDocRef.update({
        status: SummonStatus.VALIDATING,
      });
      this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Summon validated. Check the results and confirm.');
      this.$store.commit('system/SET_PAGE_STATE_SELECTED_TAB', 2);
    },
    confirmToRemove(): void {
      this.$store.commit('feedback/ASK_FOR_CONFIRMATION', {
        title: 'Remove Summon',
        message: `Are you sure you want to remove the summon of ${this.summon.label}? If already finished, the result will NOT be rolled back.`,
        callback: this.remove,
      });
    },
    async remove(): Promise<void> {
      const summonDocRef = this.$fire.firestore.collection(`users/${this.$store.state.user.user.id}/summons`).doc(this.summon.id);
      await summonDocRef.delete();
      this.$store.commit('summon/REMOVE_FROM_LIST', this.summon.id);
      this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Summon Deleted Successfully');
      this.$nuxt.$router.push('/player/summons/list');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
