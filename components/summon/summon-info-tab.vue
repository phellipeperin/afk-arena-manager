<template>
  <article>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="8"
          md="6"
          lg="4"
          offset-sm="2"
          offset-md="3"
          offset-lg="4"
          class="text-center"
        >
          <v-btn
            text
            small
            block
            color="error"
            @click="confirmToRemove"
          >
            Delete Summon
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Summon from '~/application/domain/summon/summon';

interface ComponentData {}

export default Vue.extend({
  props: {
    summon: { type: Summon, required: true },
  },
  data(): ComponentData {
    return {};
  },
  methods: {
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
