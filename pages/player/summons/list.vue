<template>
  <section>
    <ui-content-container>
      <summon-list />
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon from '~/application/domain/summon/summon';

export default Vue.extend({
  meta: {
    role: 'PREMIUM',
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Summons',
      extraActions: [{
        icon: 'mdi-plus',
        callback: this.startSummon,
      }],
    });
  },
  methods: {
    async startSummon(): Promise<void> {
      try {
        const date = new Date();
        const collectionRef = this.$fire.firestore.collection(`users/${this.$store.state.user.user.id}/summons`);
        const summon = new Summon(date.getTime().toString(), this.generateSummonLabel(date));
        const docRef = collectionRef.doc(summon.id);
        await docRef.set(JSON.parse(JSON.stringify(summon)));

        this.$store.commit('summon/ADD_TO_LIST', summon);
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Summon started successfully');
        this.$nuxt.$router.push(`/player/summons/${summon.id}`);
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      }
    },
    generateSummonLabel(date: Date): string {
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      } else {
        month = month.toString();
      }

      return `${date.getDate()}.${month}.${date.getFullYear()}`;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
