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
            hide-details
            color="black"
            type="number"
            :label="field.label"
            @input="(value) => change(field.eventName, Number(value))"
          />
          <div class="mt-4">
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
    // Values
    total: { type: Number, required: false, default: 0 },
    elite: { type: Number, required: false, default: 0 },
    star: { type: Number, required: false, default: 0 },
    awakened: { type: Number, required: false, default: 0 },
    furniture: { type: Number, required: false, default: 0 },
    cardHeroes: { type: Number, required: false, default: 0 },
    cardFurniture: { type: Number, required: false, default: 0 },
    // Show Fields
    showTotal: { type: Boolean, required: false, default: false },
    showElite: { type: Boolean, required: false, default: false },
    showStar: { type: Boolean, required: false, default: false },
    showAwakened: { type: Boolean, required: false, default: false },
    showFurniture: { type: Boolean, required: false, default: false },
    showCardHeroes: { type: Boolean, required: false, default: false },
    showCardFurniture: { type: Boolean, required: false, default: false },
  },
  computed: {
    fieldList(): Array<Field> {
      const list: Array<Field> = [];
      if (this.showTotal) {
        list.push({ label: 'Total Pulls', eventName: 'changeTotal', cardColor: 'accent', value: this.total, buttons: [100, 10] });
      }
      if (this.showElite) {
        list.push({ label: 'Elite Heroes', eventName: 'changeElite', cardColor: 'elite', value: this.elite, buttons: [10, 1] });
      }
      if (this.showStar) {
        list.push({ label: 'Star Heroes', eventName: 'changeStar', cardColor: 'primary', value: this.star, buttons: [10, 1] });
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
