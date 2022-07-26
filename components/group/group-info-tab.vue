<template>
  <article>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="8"
          md="6"
          lg="4"
          offset-sm="2"
          offset-md="3"
          offset-lg="4"
          class="text-center"
        >
          <ui-avatar
            :photo-url="groupData.image"
            size="160"
            class="mb-4"
          />
          <v-text-field
            :value="groupData.id"
            disabled
            label="ID"
          />
          <v-text-field
            v-model="groupData.name"
            color="primary"
            label="Name"
            :rules="validation.getRules('groupData.name')"
            @keyup.enter="saveInfo"
            @update:error="(state) => validation.changeValidationState('groupData.name', state)"
          />
          <v-text-field
            v-model="groupData.image"
            color="primary"
            label="Image URL"
            :rules="validation.getRules('groupData.image')"
            @keyup.enter="saveInfo"
            @update:error="(state) => validation.changeValidationState('groupData.image', state)"
          />

          <v-btn
            block
            large
            color="accent"
            :disabled="requestActive"
            :loading="requestActive"
            @click="saveInfo"
          >
            Update Info
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleRequired, ruleMinLength } from '~/application/services/validationService';
import Group from '~/application/domain/group/group';

interface ComponentData {
  requestActive: boolean;
  validation: Validation;
  groupData: Group;
}

export default Vue.extend({
  props: {
    group: { type: Group, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      requestActive: false,
      validation: new Validation(),
      groupData: new Group(),
    };
  },
  created(): void {
    this.loadData();
    this.loadValidation();
  },
  methods: {
    loadData(): void {
      this.groupData.id = this.group.id;
      this.groupData.name = this.group.name;
      this.groupData.image = this.group.image;
    },
    async saveInfo(): Promise<void> {
      if (!this.validation.hasAnyError) {
        try {
          this.requestActive = true;
          const docRef = this.$fire.firestore.collection('groups').doc(this.groupData.id);
          this.groupData.members = this.$store.state.group.list.filter((elem: Group) => elem.id === this.groupData.id)?.members || [];
          const data = JSON.parse(JSON.stringify(this.groupData));
          await docRef.update(data);

          const newGroupDataList = this.$store.state.group.list.filter((elem: Group) => elem.id !== this.groupData.id);
          newGroupDataList.push(this.groupData);
          this.$store.commit('group/SET_LIST', newGroupDataList);
          this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Group Info Updated Successfully');
          this.resetValidation();
        } catch (e) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
        } finally {
          this.requestActive = false;
        }
      }
    },
    loadValidation(): void {
      this.validation.addRule('groupData.name', (value: string) => ruleRequired(value));
      this.validation.addRule('groupData.name', (value: string) => ruleMinLength(value, 3));
      this.validation.addRule('groupData.image', (value: string) => ruleRequired(value));
    },
    resetValidation(): void {
      this.validation.reset();
      this.loadValidation();
    },
    logout(): void {
      this.$fire.auth.signOut().then(() => {
        this.$nuxt.$router.replace('/');
      });
    },
  },
});
</script>

<style scoped lang="scss">

</style>
