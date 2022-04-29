<template>
  <section>
    <v-bottom-sheet
      :value="value"
      scrollable
      fullscreen
      @input="changeOpenState"
    >
      <v-card>
        <v-card-text>
          <v-sheet>
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <ui-sub-header text="Actions" />
                  <v-btn
                    color="accent"
                    @click="() => changeOpenState(false)"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    text
                    @click="setStateToDefault"
                  >
                    Reset
                  </v-btn>
                  <v-btn
                    text
                    color="accent"
                    @click="createFilter"
                  >
                    Save Filter
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <ui-sub-header text="Quick Filters" />
                  <v-btn
                    v-for="gameFilter in $store.state.filter.gameList"
                    :key="gameFilter.id"
                    x-small
                    class="ma-1"
                    @click="() => setStateToSpecificFilter(gameFilter.state)"
                  >
                    {{ gameFilter.name }}
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <ui-sub-header text="Your Filters" />
                  <ui-no-result
                    v-if="!$store.state.filter.userList.length"
                    full-width
                    text="No filters created"
                  />
                  <div class="d-flex">
                    <div
                      v-for="(userFilter, index) in $store.state.filter.userList"
                      :key="userFilter.id"
                      :class="`${index ? 'ml-5' : ''}`"
                    >
                      <v-btn
                        x-small
                        @click="() => setStateToSpecificFilter(userFilter.state)"
                      >
                        {{ userFilter.name }}
                      </v-btn>
                      <v-btn
                        icon
                        x-small
                        color="secondary"
                        @click="() => editFilter(userFilter)"
                      >
                        <v-icon
                          small
                          dark
                        >
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-8" />

              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <ui-sub-header text="Main" />
                  <v-select
                    :value="$store.state.filter.current.sort"
                    :items="sortOptions"
                    item-text="label"
                    item-value="value"
                    label="Sort"
                    @input="(value) => $store.commit('filter/SET_SORT', value)"
                  />
                  <v-select
                    :value="$store.state.filter.current.groupBy"
                    :items="groupByOptions"
                    item-text="label"
                    item-value="value"
                    label="Group By"
                    @input="(value) => $store.commit('filter/SET_GROUP_BY', value)"
                  />

                  <ui-sub-header text="Game Data" />
                  <ui-selector-type
                    :value="$store.state.filter.current.type"
                    show-label
                    multiple
                    @input="(value) => $store.commit('filter/SET_TYPE', value)"
                  />
                  <ui-selector-group
                    :value="$store.state.filter.current.group"
                    show-label
                    multiple
                    @input="(value) => $store.commit('filter/SET_GROUP', value)"
                  />
                  <ui-selector-faction
                    :value="$store.state.filter.current.faction"
                    show-label
                    multiple
                    @input="(value) => $store.commit('filter/SET_FACTION', value)"
                  />
                  <ui-selector-role
                    :value="$store.state.filter.current.role"
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
                  <ui-sub-header text="Player General Data" />

                  <ui-selector-ascension
                    :value="$store.state.filter.current.ascension"
                    show-label
                    show-none
                    multiple
                    @input="(value) => $store.commit('filter/SET_ASCENSION', value)"
                  />

                  <v-label>
                    <p class="mt-4 mb-2">Crystal</p>
                  </v-label>
                  <v-radio-group
                    :value="$store.state.filter.current.crystal"
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
                  <ui-sub-header text="Player Specific Data" />

                  <v-label>
                    <p class="mt-4 mb-10">
                      Signature Item
                    </p>
                  </v-label>
                  <v-row>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.signatureItemMin"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        min="-1"
                        :max="$store.state.filter.current.signatureItemMax"
                        @change="(value) => $store.commit('filter/SET_SIGNATURE_ITEM_MIN', value)"
                      >
                        <template #thumb-label="props">
                          {{ props.value === -1 ? 'NA' : `+${props.value}` }}
                        </template>
                      </v-slider>
                    </v-col>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.signatureItemMax"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        :min="$store.state.filter.current.signatureItemMin"
                        max="40"
                        @change="(value) => $store.commit('filter/SET_SIGNATURE_ITEM_MAX', value)"
                      >
                        <template #thumb-label="props">
                          {{ props.value === -1 ? 'NA' : `+${props.value}` }}
                        </template>
                      </v-slider>
                    </v-col>
                  </v-row>

                  <v-label>
                    <p class="mt-4 mb-10">
                      Mythic Furniture
                    </p>
                  </v-label>
                  <v-row>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.furnitureMin"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        min="0"
                        :max="$store.state.filter.current.furnitureMax"
                        @change="(value) => $store.commit('filter/SET_FURNITURE_MIN', value)"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.furnitureMax"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        :min="$store.state.filter.current.furnitureMin"
                        max="36"
                        @change="(value) => $store.commit('filter/SET_FURNITURE_MAX', value)"
                      />
                    </v-col>
                  </v-row>

                  <v-label>
                    <p class="mt-4 mb-10">
                      Engrave
                    </p>
                  </v-label>
                  <v-row>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.engraveMin"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        min="0"
                        :max="$store.state.filter.current.engraveMax"
                        @change="(value) => $store.commit('filter/SET_ENGRAVE_MIN', value)"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.engraveMax"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        :min="$store.state.filter.current.engraveMin"
                        max="100"
                        @change="(value) => $store.commit('filter/SET_ENGRAVE_MAX', value)"
                      />
                    </v-col>
                  </v-row>

                  <v-label>
                    <p class="mt-4 mb-10">
                      No. T4 Equipment
                    </p>
                  </v-label>
                  <v-row>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.equipmentMin"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        min="0"
                        :max="$store.state.filter.current.equipmentMax"
                        @change="(value) => $store.commit('filter/SET_EQUIPMENT_MIN', value)"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.equipmentMax"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        :min="$store.state.filter.current.equipmentMin"
                        max="4"
                        @change="(value) => $store.commit('filter/SET_EQUIPMENT_MAX', value)"
                      />
                    </v-col>
                  </v-row>

                  <v-label>
                    <p class="mt-4 mb-10">
                      Priority
                    </p>
                  </v-label>
                  <v-row>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.priorityMin"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        min="0"
                        :max="$store.state.filter.current.priorityMax"
                        @change="(value) => $store.commit('filter/SET_PRIORITY_MIN', value)"
                      >
                        <template #thumb-label="props">
                          {{ formatPriorityLabel(props.value) }}
                        </template>
                      </v-slider>
                    </v-col>
                    <v-col cols="6">
                      <v-slider
                        :value="$store.state.filter.current.priorityMax"
                        hide-details
                        thumb-label="always"
                        ticks
                        :thumb-size="24"
                        :min="$store.state.filter.current.priorityMin"
                        max="4"
                        @change="(value) => $store.commit('filter/SET_PRIORITY_MAX', value)"
                      >
                        <template #thumb-label="props">
                          {{ formatPriorityLabel(props.value) }}
                        </template>
                      </v-slider>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <hero-filter-dialog v-model="dialogOpen" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Filter, FilterGroupBy, FilterSort, FilterState } from '~/store/filter';
import { loadPriorityLabel } from '~/application/services/textService';

interface ComponentData {
  dialogOpen: boolean;
}

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
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
        { value: FilterSort.PRIORITY_DESC, label: 'Priority (high)' },
        { value: FilterSort.PRIORITY_ASC, label: 'Priority (low)' },
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
        { value: FilterGroupBy.PRIORITY, label: 'Priority' },
      ];
    },
  },
  methods: {
    createFilter(): void {
      this.$store.commit('filter/SET_EDITING', { id: '', name: '', state: this.$store.state.filter.current });
      this.dialogOpen = true;
    },
    editFilter(filter: Filter): void {
      this.$store.commit('filter/SET_EDITING', filter);
      this.dialogOpen = true;
    },
    setStateToDefault(): void {
      this.$store.commit('filter/SET_WHOLE_FILTER', this.$store.state.filter.gameList[0].state);
    },
    setStateToSpecificFilter(filterState: FilterState): void {
      this.$store.commit('filter/SET_WHOLE_FILTER', filterState);
    },
    formatPriorityLabel(value: number): string {
      return loadPriorityLabel(value);
    },
    changeOpenState(newState: boolean): void {
      this.$emit('input', newState);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
