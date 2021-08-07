<template>
  <div>
    <app-dialog
      :value="value"
      :title="$store.state.snapshot.snapshot.name || 'New Snapshot'"
      max-width="600"
      @input="cancel"
    >
      <form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :value="$store.state.snapshot.snapshot.name"
                autofocus
                label="Name"
                :rules="validation.getRules('name')"
                @input="(value) => $store.commit('snapshot/SET_SNAPSHOT_NAME', value)"
                @update:error="(state) => validation.changeValidationState('name', state)"
              />
            </v-col>
          </v-row>
        </v-container>
      </form>

      <template #actions>
        <v-btn
          v-if="$store.state.snapshot.snapshot.id"
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
import Validation, { ruleMinLength, ruleRequired } from '~/application/services/validationService';
import Snapshot from '~/application/domain/snapshot/snapshot';
import Hero from '~/application/domain/hero/hero';

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
      const { name } = this.$store.state.snapshot.snapshot;
      return !this.validation.hasAnyError && !!name;
    },
  },
  created() {
    this.loadValidation();
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.$store.commit('snapshot/SET_SNAPSHOT', new Snapshot());
      this.resetValidation();
    },
    async remove(): Promise<void> {
      this.activeRequest = true;
      try {
        const userId = this.$store.state.user.user.id;
        const snapshotId = this.$store.state.snapshot.snapshot.id;

        await this.$fire.firestore.collection(`users/${userId}/snapshots`).doc(snapshotId).delete();

        this.$emit('input', false);
        this.$store.commit('snapshot/DELETE_SNAPSHOT', this.$store.state.snapshot.snapshot.id);
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Snapshot Deleted Successfully');
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
        const { id: snapshotId, ...rest } = this.$store.state.snapshot.snapshot;
        try {
          let newId = snapshotId;
          if (snapshotId) {
            const docRef = this.$fire.firestore.collection(`users/${userId}/snapshots`).doc(snapshotId);
            await docRef.update(JSON.parse(JSON.stringify(rest)));
          } else {
            const docRef = this.$fire.firestore.collection(`users/${userId}/snapshots`).doc();
            newId = docRef.id;
            await docRef.set(JSON.parse(JSON.stringify(rest)));
          }
          this.$emit('input', false);
          this.$store.commit('snapshot/UPDATE_SNAPSHOT', new Snapshot(newId, rest.name, rest.futureGoal, rest.createdAt));
          this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Snapshot Saved Successfully');
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
      this.validation.addRule('name', (value: string) => ruleMinLength(value, 3));
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
