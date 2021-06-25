<template>
  <div>
    <v-btn
      fab
      fixed
      right
      bottom
      large
      color="primary"
      elevation="3"
      @click="openFilter"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>

    <v-bottom-sheet v-model="isFilterOpen">
      <v-sheet height="600px">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <ui-sub-header text="Game Data" />
              <ui-selector-type
                :value="$store.state.hero.hero.gameInfo.type"
                show-label
                @input="(value) => $store.commit('hero/SET_GAME_INFO_TYPE', value)"
              />
              <ui-selector-group
                :value="$store.state.hero.hero.gameInfo.group"
                show-label
                @input="(value) => $store.commit('hero/SET_GAME_INFO_GROUP', value)"
              />
              <ui-selector-faction
                :value="$store.state.hero.hero.gameInfo.faction"
                show-label
                @input="(value) => $store.commit('hero/SET_GAME_INFO_FACTION', value)"
              />
              <ui-selector-role
                :value="$store.state.hero.hero.gameInfo.role"
                show-label
                @input="(value) => $store.commit('hero/SET_GAME_INFO_ROLE', value)"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <ui-sub-header text="Player Data" />

              <ui-selector-ascension
                :value="$store.state.hero.hero.gameInfo.role"
                show-label
                @input="(value) => $store.commit('hero/SET_GAME_INFO_ROLE', value)"
              />

              <v-label class="text-subtitle-1">
                Signature Item
              </v-label>
              <v-range-slider
                v-model="signatureItem"
                hide-details
                thumb-label="always"
                ticks="always"
                :thumb-size="24"
                min="-1"
                max="40"
                track-color="none"
                class="mt-7"
              >
                <template #thumb-label="props">
                  {{ props.value === -1 ? 'NA' : `+${props.value}` }}
                </template>
              </v-range-slider>

              <v-label class="text-subtitle-1 my-1">
                No of Mythic Furniture
              </v-label>
              <v-range-slider
                v-model="signatureItem"
                hide-details
                thumb-label="always"
                ticks="always"
                :thumb-size="24"
                min="0"
                max="9"
                track-color="none"
                class="mt-7"
              />

              <v-label class="text-subtitle-1 my-1">
                No of T3 Equipment
              </v-label>
              <v-range-slider
                v-model="signatureItem"
                hide-details
                thumb-label="always"
                ticks="always"
                :thumb-size="24"
                min="0"
                max="4"
                track-color="none"
                class="mt-7"
              />

              <v-label class="text-subtitle-1 my-1">
                Crystal
              </v-label>
              <v-radio-group v-model="radioGroup">
                <v-radio
                  label="Both"
                  value="BOTH"
                />
                <v-radio
                  label="On Crystal"
                  value="BOTH"
                />
                <v-radio
                  label="Not On Crystal"
                  value="BOTH"
                />
              </v-radio-group>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <ui-sub-header text="Actions" />
              <v-btn
                raised
                large
                color="primary"
                @click="resetFilter"
              >
                Apply
              </v-btn>
              <v-btn
                text
                @click="resetFilter"
              >
                Clear All
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  isFilterOpen: boolean;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      isFilterOpen: false,
    };
  },
  methods: {
    openFilter(): void {
      this.isFilterOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
