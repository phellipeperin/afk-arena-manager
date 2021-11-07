<template>
  <div>
    <app-dialog
      :value="value"
      :title="$store.state.filter.currentEditing.name || 'New Custom Filter'"
      max-width="600"
      @input="cancel"
    >
      <form>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :value="$store.state.filter.currentEditing.name"
                autofocus
                label="Name"
                :rules="validation.getRules('name')"
                @input="(value) => $store.commit('filter/SET_EDITING_NAME', value)"
                @update:error="(state) => validation.changeValidationState('name', state)"
              />
            </v-col>
          </v-row>
        </v-container>
      </form>

      <template #actions>
        <v-btn
          v-if="$store.state.filter.currentEditing.id"
          text
          color="error"
          :disabled="activeRequest"
          :loading="activeRequest"
          @click="remove"
        >
          Remove
        </v-btn>
        <v-btn
          text
          :disabled="activeRequest"
          :loading="activeRequest"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!canSave || activeRequest"
          :loading="activeRequest"
          @click="saveUpdate"
        >
          Save
        </v-btn>
      </template>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleMinLength, ruleMaxLength, ruleRequired } from '~/application/services/validationService';

interface ComponentData {
  validation: Validation;
  activeRequest: boolean;
}

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
  },
  data(): ComponentData {
    return {
      validation: new Validation(),
      activeRequest: false,
    };
  },
  computed: {
    canSave(): boolean {
      const { name } = this.$store.state.filter.currentEditing;
      return !this.validation.hasAnyError && !!name;
    },
  },
  created() {
    this.loadValidation();
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.$store.commit('filter/SET_EDITING', {});
      this.resetValidation();
    },
    async remove(): Promise<void> {
      this.activeRequest = true;
      try {
        const userId = this.$store.state.user.user.id;
        const filterId = this.$store.state.filter.currentEditing.id;

        await this.$fire.firestore.collection(`users/${userId}/filters`).doc(filterId).delete();

        this.$emit('input', false);
        this.$store.commit('filter/DELETE_USER_FILTER', this.$store.state.filter.currentEditing.id);
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Filter Deleted Successfully');
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      } finally {
        this.activeRequest = false;
      }
    },
    async saveUpdate(): Promise<void> {
      if (!this.validation.hasAnyError) {
        this.activeRequest = true;
        const userId = this.$store.state.user.user.id;
        const { id: filterId, ...rest } = this.$store.state.filter.currentEditing;
        try {
          let newId = filterId;
          if (filterId) {
            const docRef = this.$fire.firestore.collection(`users/${userId}/filters`).doc(filterId);
            await docRef.update(JSON.parse(JSON.stringify(rest)));
          } else {
            const docRef = this.$fire.firestore.collection(`users/${userId}/filters`).doc();
            newId = docRef.id;
            await docRef.set(JSON.parse(JSON.stringify(rest)));
          }

          this.$store.commit('filter/UPDATE_USER_FILTER', { id: newId, name: rest.name, state: rest.state });
          this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Filter Saved Successfully');

          this.$emit('input', false);
          this.resetValidation();
        } catch (e) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
        } finally {
          this.activeRequest = false;
        }
      }
    },
    loadValidation(): void {
      this.validation.addRule('name', (value: string) => ruleRequired(value));
      this.validation.addRule('name', (value: string) => ruleMinLength(value, 2));
      this.validation.addRule('name', (value: string) => ruleMaxLength(value, 15));
    },
    resetValidation(): void {
      this.validation.reset();
      this.loadValidation();
    },
  },
});
</script>

<style scoped lang="scss">

</style>
