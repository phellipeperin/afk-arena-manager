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
        <ui-no-result text="No Differences" />
      </v-col>
      <v-col
        v-for="diff in heroDiffList"
        :key="diff.hero.id"
        cols="12"
        sm="3"
      >
        <ui-card class="d-flex align-top">
          <v-sheet
            shaped
            height="92"
            width="92"
            class="hero-image ma-2"
          >
            <img
              :alt="diff.hero.gameInfo.name"
              :src="diff.hero.gameInfo.images.profile"
            >
          </v-sheet>
          <ul class="my-2">
            <li
              v-for="item in diff.diffList"
              :key="`${diff.hero.id}_${item}`"
              class="text-caption"
            >
              <span v-html="item" />
            </li>
          </ul>
        </ui-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SnapshotHeroDiff from '~/application/domain/snapshot/snapshotHeroDiff';
import { getPastSnapshotHeroesDifference, getFutureSnapshotHeroesDifference } from '~/application/services/snapshotService';

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

        const newSnapshotHeroes = this.$store.getters['snapshot/heroList'](this.$store.state.snapshot.list[this.selectedSnapshot]?.id || '');
        const playerHeroes = this.$store.getters['hero/baseHeroList'](this.$store.state.user.user.id);
        if (this.futureGoal) {
          this.heroDiffList = getFutureSnapshotHeroesDifference(newSnapshotHeroes, playerHeroes);
        } else {
          this.heroDiffList = getPastSnapshotHeroesDifference(newSnapshotHeroes, playerHeroes);
        }
        this.loading = false;
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
.hero-image {
  position: relative;
  display: flex;
  flex-shrink: 0;
  justify-content: center;

  img {
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 20px 4px;
  }
}
</style>
