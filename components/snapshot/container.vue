<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-no-result v-if="!$store.state.snapshot.list.length" />

        <v-tabs
          v-if="$store.state.snapshot.list.length"
          v-model="selectedSnapshot"
          show-arrows
        >
          <v-tab
            v-for="(snap, index) in $store.state.snapshot.list"
            :key="snap.id"
            :disabled="loading && index !== selectedSnapshot"
          >
            {{ snap.name }}

            <v-btn
              v-show="index === selectedSnapshot"
              icon
              small
              :disabled="loading"
              color="secondary"
              class="ml-4"
              @click="edit"
            >
              <v-icon
                small
                dark
              >
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row v-show="$store.state.snapshot.list.length && loading">
      <v-col
        v-for="n in [1, 2, 3, 4]"
        :key="n"
        cols="12"
        sm="3"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <v-row v-show="$store.state.snapshot.list.length && !loading">
      <v-col
        v-show="!heroDiffList.length"
        cols="12"
      >
        <ui-no-result />
      </v-col>
      <v-col
        v-for="diff in heroDiffList"
        :key="diff.hero.id"
        cols="12"
        sm="3"
      >
        {{ hero }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import SnapshotHeroDiff from '~/application/domain/snapshot/snapshotHeroDiff';
import { getSnapshotHeroesDifference } from '~/application/services/snapshotService';

interface ComponentData {
  heroDiffList: Array<SnapshotHeroDiff>;
  selectedSnapshot: number;
  loading: boolean;
}

export default Vue.extend({
  props: {
    futureGoal: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      heroDiffList: [],
      selectedSnapshot: -1,
      loading: true,
    };
  },
  watch: {
    selectedSnapshot: {
      async handler(): Promise<void> {
        this.loading = true;
        if (this.$store.state.snapshot.list.length && !this.$store.getters['snapshot/heroList'](this.$store.state.snapshot.list[this.selectedSnapshot]?.id || '').length) {
          const userId = this.$store.state.user.user.id;
          const snapshotId = this.$store.state.snapshot.list[this.selectedSnapshot].id;
          await this.$store.dispatch('snapshot/loadHeroesForSnapshot', { userId, snapshotId });
        }

        setTimeout(() => {
          const newSnapshotHeroes = this.$store.getters['snapshot/heroList'](this.$store.state.snapshot.list[this.selectedSnapshot]?.id || '');
          const playerHeroes = this.$store.getters['hero/baseHeroList'](this.$store.state.user.user.id);
          this.heroDiffList = getSnapshotHeroesDifference(newSnapshotHeroes, playerHeroes);
          this.loading = false;
        }, 0);
      },
    },
    '$store.state.snapshot.list.length': {
      handler(newSize: number, oldSize: number): void {
        if (newSize < oldSize) {
          this.selectedSnapshot = 0;
        }
      },
    },
  },
  async created(): Promise<void> {
    const userId = this.$store.state.user.user.id;
    const heroList = this.$store.getters['hero/baseHeroList'](userId);
    if (!heroList.length) {
      await this.$store.dispatch('hero/loadHeroesForUser', userId);
    }

    if (!this.$store.state.snapshot.loaded) {
      await this.$store.dispatch('snapshot/loadSnapshots', userId);
    }
    this.selectedSnapshot = 0;
  },
  methods: {
    edit(): void {
      this.$emit('edit', JSON.parse(JSON.stringify(this.$store.state.snapshot.list[this.selectedSnapshot])));
    },
  },
});
</script>

<style scoped lang="scss">

</style>
