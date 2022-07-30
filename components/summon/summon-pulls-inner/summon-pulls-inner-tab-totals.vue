<template>
  <section>
    <ui-sub-header text="Totals" />
    <v-row>
      <v-col
        v-for="field in fieldList"
        :key="field.eventName"
        cols="12"
        sm="4"
        md="3"
      >
        <ui-card
          elevation="0"
          :color="field.cardColor"
          class="d-flex px-4 py-2"
        >
          <v-text-field
            :value="field.value"
            :label="field.label"
            :disabled="disabled"
            hide-details
            color="black"
            type="number"
            @input="(value) => change(field.eventName, Number(value))"
          />
          <div
            v-if="!disabled"
            class="mt-4"
          >
            <v-btn
              v-for="button in field.buttons"
              :key="`${field.eventName}-${button}`"
              text
              @click="() => change(field.eventName, field.value + button)"
            >
              +{{ button }}
            </v-btn>
          </div>
        </ui-card>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

interface Field {
  label: string;
  eventName: string;
  cardColor: string;
  value: number;
  buttons: Array<number>;
}

export default Vue.extend({
  props: {
    disabled: { type: Boolean, required: false, default: false },
    // Values
    total: { type: Number, required: false, default: 0 },
    normal: { type: Number, required: false, default: 0 },
    celepogean: { type: Number, required: false, default: 0 },
    awakened: { type: Number, required: false, default: 0 },
    furniture: { type: Number, required: false, default: 0 },
    cardHeroes: { type: Number, required: false, default: 0 },
    cardFurniture: { type: Number, required: false, default: 0 },
    // Show Fields
    showTotal: { type: Boolean, required: false, default: false },
    showNormal: { type: Boolean, required: false, default: false },
    showCelepogean: { type: Boolean, required: false, default: false },
    showAwakened: { type: Boolean, required: false, default: false },
    showFurniture: { type: Boolean, required: false, default: false },
    showCardHeroes: { type: Boolean, required: false, default: false },
    showCardFurniture: { type: Boolean, required: false, default: false },
  },
  computed: {
    fieldList(): Array<Field> {
      const list: Array<Field> = [];
      if (this.showTotal) {
        list.push({ label: 'Total Pulls', eventName: 'changeTotal', cardColor: 'info', value: this.total, buttons: [100, 10] });
      }
      if (this.showNormal) {
        list.push({ label: 'Normal Faction Heroes', eventName: 'changeNormal', cardColor: 'elite', value: this.normal, buttons: [10, 1] });
      }
      if (this.showCelepogean) {
        list.push({ label: 'Celepogean Heroes', eventName: 'changeCelepogean', cardColor: 'accent', value: this.celepogean, buttons: [10, 1] });
      }
      if (this.showAwakened) {
        list.push({ label: 'Awakened Heroes', eventName: 'changeAwakened', cardColor: 'legendary', value: this.awakened, buttons: [10, 1] });
      }
      if (this.showFurniture) {
        list.push({ label: 'Furniture', eventName: 'changeFurniture', cardColor: 'mythic', value: this.furniture, buttons: [100, 10] });
      }
      if (this.showCardHeroes) {
        list.push({ label: 'Heroes Cards', eventName: 'changeCardHeroes', cardColor: 'elite', value: this.cardHeroes, buttons: [10, 1] });
      }
      if (this.showCardFurniture) {
        list.push({ label: 'Furniture Cards', eventName: 'changeCardFurniture', cardColor: 'mythic', value: this.cardFurniture, buttons: [10, 1] });
      }
      return list;
    },
  },
  methods: {
    change(event: string, newValue: number): void {
      this.$emit(event, newValue);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
