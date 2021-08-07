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
          >
            {{ snap.name }}

            <v-btn
              v-show="index === selectedSnapshot"
              icon
              small
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
    <v-row v-if="$store.state.snapshot.list.length">
      <v-col cols="12">

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  selectedSnapshot: number;
}

export default Vue.extend({
  props: {
    futureGoal: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      selectedSnapshot: 0,
    };
  },
  computed: {
    snapshotHeroes(): Array<Hero> {
      return this.$store.getters['snapshot/heroList'](this.$store.state.snapshot.list[this.selectedSnapshot]);
    },
    playerHeroes(): Array<Hero> {
      return this.$store.getters['hero/baseHeroList'](this.$store.state.user.user.id);
    },
  },
  watch: {
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
    // await this.$store.dispatch('hero/filterChange', this.$store.state.filter);

    if (!this.$store.state.snapshot.loaded) {
      await this.$store.dispatch('snapshot/loadSnapshots', userId);
    }
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
