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

    <v-bottom-sheet
      v-model="isFilterOpen"
      scrollable
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <v-card-text style="height: 600px;">
          <v-sheet>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <ui-sub-header text="Main" />
                  <v-select
                    :value="$store.state.filter.sort"
                    :items="sortOptions"
                    item-text="label"
                    item-value="value"
                    label="Sort"
                    @input="(value) => $store.commit('filter/SET_SORT', value)"
                  />
                  <v-select
                    :value="$store.state.filter.groupBy"
                    :items="groupByOptions"
                    item-text="label"
                    item-value="value"
                    label="Group By"
                    @input="(value) => $store.commit('filter/SET_GROUP_BY', value)"
                  />

                  <ui-sub-header text="Game Data" />
                  <ui-selector-type
                    :value="$store.state.filter.type"
                    show-label
                    multiple
                    @input="(value) => $store.commit('filter/SET_TYPE', value)"
                  />
                  <ui-selector-group
                    :value="$store.state.filter.group"
                    show-label
                    multiple
                    @input="(value) => $store.commit('filter/SET_GROUP', value)"
                  />
                  <ui-selector-faction
                    :value="$store.state.filter.faction"
                    show-label
                    multiple
                    @input="(value) => $store.commit('filter/SET_FACTION', value)"
                  />
                  <ui-selector-role
                    :value="$store.state.filter.role"
                    show-label
                    multiple
                    @input="(value) => $store.commit('filter/SET_ROLE', value)"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <ui-sub-header text="Player Data" />

                  <ui-selector-ascension
                    :value="$store.state.filter.ascension"
                    show-label
                    show-none
                    multiple
                    @input="(value) => $store.commit('filter/SET_ASCENSION', value)"
                  />

                  <v-range-slider
                    :value="$store.state.filter.signatureItem"
                    label="Signature Item"
                    persistent-hint
                    hint="Upper value NOT included (unless max)."
                    thumb-label="always"
                    ticks="always"
                    :thumb-size="24"
                    min="-1"
                    max="41"
                    track-color="none"
                    class="mt-7"
                    @change="(value) => $store.commit('filter/SET_SIGNATURE_ITEM', value)"
                  >
                    <template #thumb-label="props">
                      {{ props.value === -1 ? 'NA' : (props.value === 41 ? 'Max' : `+${props.value}`) }}
                    </template>
                  </v-range-slider>

                  <v-range-slider
                    :value="$store.state.filter.furniture"
                    label="No. Mythic Furniture"
                    persistent-hint
                    hint="Upper value NOT included (unless max)."
                    thumb-label="always"
                    ticks="always"
                    :thumb-size="24"
                    min="0"
                    max="10"
                    track-color="none"
                    class="mt-7"
                    @change="(value) => $store.commit('filter/SET_FURNITURE', value)"
                  >
                    <template #thumb-label="props">
                      {{ props.value === 10 ? 'Max' : props.value }}
                    </template>
                  </v-range-slider>

                  <v-range-slider
                    :value="$store.state.filter.engrave"
                    label="Engraving"
                    persistent-hint
                    hint="Upper value NOT included (unless max)."
                    thumb-label="always"
                    ticks="always"
                    :thumb-size="24"
                    min="0"
                    max="101"
                    track-color="none"
                    class="mt-7"
                    @change="(value) => $store.commit('filter/SET_ENGRAVE', value)"
                  >
                    <template #thumb-label="props">
                      {{ props.value === 101 ? 'Max' : props.value }}
                    </template>
                  </v-range-slider>

                  <v-range-slider
                    :value="$store.state.filter.equipment"
                    label="No. T3 Equipment"
                    persistent-hint
                    hint="Upper value NOT included (unless max)."
                    thumb-label="always"
                    ticks="always"
                    :thumb-size="24"
                    min="0"
                    max="5"
                    track-color="none"
                    class="mt-7"
                    @change="(value) => $store.commit('filter/SET_EQUIPMENT', value)"
                  >
                    <template #thumb-label="props">
                      {{ props.value === 5 ? 'Max' : props.value }}
                    </template>
                  </v-range-slider>

                  <v-label class="text-subtitle-1">
                    Crystal
                  </v-label>
                  <v-radio-group
                    :value="$store.state.filter.crystal"
                    row
                    class="mt-0"
                    @change="(value) => $store.commit('filter/SET_CRYSTAL', value)"
                  >
                    <v-radio
                      label="Both"
                      value="BOTH"
                    />
                    <v-radio
                      label="On Crystal"
                      value="ON_CRYSTAL"
                    />
                    <v-radio
                      label="Not On Crystal"
                      value="NOT_ON_CRYSTAL"
                    />
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <ui-sub-header text="Actions" />
                  <v-btn
                    raised
                    color="primary"
                    @click="closeFilter"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    text
                    @click="resetFilter"
                  >
                    Reset
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { FilterGroupBy, FilterSort } from '~/store/filter';

interface ComponentData {
  isFilterOpen: boolean;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      isFilterOpen: false,
    };
  },
  computed: {
    sortOptions() {
      return [
        { value: FilterSort.DEFAULT, label: 'Default' },
        { value: FilterSort.FACTION, label: 'Faction' },
        { value: FilterSort.NAME, label: 'Name' },
        { value: FilterSort.ASCENSION_DESC, label: 'Ascension (high)' },
        { value: FilterSort.ASCENSION_ASC, label: 'Ascension (low)' },
        { value: FilterSort.SI_DESC, label: 'Signature Item (high)' },
        { value: FilterSort.SI_ASC, label: 'Signature Item (low)' },
        { value: FilterSort.FURNITURE_DESC, label: 'Number of Furniture (high)' },
        { value: FilterSort.FURNITURE_ASC, label: 'Number of Furniture (low)' },
        { value: FilterSort.ENGRAVE_DESC, label: 'Engraving (high)' },
        { value: FilterSort.ENGRAVE_ASC, label: 'Engraving (low)' },
        { value: FilterSort.EQUIPMENT_DESC, label: 'Number of T3 Equipment (high)' },
        { value: FilterSort.EQUIPMENT_ASC, label: 'Number of T3 Equipment (low)' },
      ];
    },
    groupByOptions() {
      return [
        { value: FilterGroupBy.NONE, label: 'None' },
        { value: FilterGroupBy.FACTION, label: 'Faction' },
        { value: FilterGroupBy.ASCENSION, label: 'Ascension' },
        { value: FilterGroupBy.SI, label: 'Signature Item' },
        { value: FilterGroupBy.FURNITURE, label: 'Furniture' },
        { value: FilterGroupBy.ENGRAVE, label: 'Engrave' },
        { value: FilterGroupBy.EQUIPMENT, label: 'Equipment' },
      ];
    },
  },
  methods: {
    openFilter(): void {
      this.isFilterOpen = true;
    },
    closeFilter(): void {
      this.isFilterOpen = false;
    },
    resetFilter(): void {
      this.$store.commit('filter/RESET');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
