<template>
  <app-dialog
    :value="value"
    title="Create Group"
    max-width="600"
    @input="cancel"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          class="text-center"
        >
          <ui-avatar
            :photo-url="image"
            size="120"
            class="mb-4"
          />

          <v-text-field
            v-model="name"
            autofocus
            color="primary"
            label="Name"
            :rules="validation.getRules('name')"
            @update:error="(state) => validation.changeValidationState('name', state)"
          />

          <v-text-field
            v-model="image"
            color="primary"
            label="Image URL"
            :rules="validation.getRules('image')"
            @update:error="(state) => validation.changeValidationState('name', state)"
          />
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <v-btn
        text
        @click="cancel"
      >
        Cancel
      </v-btn>
      <v-btn
        color="accent"
        :disabled="!name || !image"
        @click="saveUpdate"
      >
        Confirm and Create
      </v-btn>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleMinLength, ruleRequired } from '~/application/services/validationService';
import Group from '~/application/domain/group/group';
import GroupMember from '~/application/domain/group/groupMember';

interface ComponentData {
  validation: Validation;
  name: string;
  image: string;
}

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
  },
  data(): ComponentData {
    return {
      validation: new Validation(),
      name: '',
      image: '',
    };
  },
  watch: {
    value: {
      handler(): void {
        this.clear();
      },
    },
  },
  created(): void {
    this.loadValidation();
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.clear();
      this.resetValidation();
    },
    async saveUpdate(): Promise<void> {
      try {
        const collectionRef = this.$fire.firestore.collection('groups');
        const groupMember = new GroupMember(this.$store.state.user.user.id, 'ADMIN');
        const group = new Group('', this.name, this.image, [groupMember]);
        const docRef = await collectionRef.add(JSON.parse(JSON.stringify(group)));
        group.id = docRef.id;

        const newGroupList = [...(this.$store.state.user.user.groups || [])];
        newGroupList.push(docRef.id);
        const userDocRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
        const data = {
          groups: JSON.parse(JSON.stringify(newGroupList)),
        };
        await userDocRef.update(data);
        this.$store.commit('user/SET_GROUPS', newGroupList);

        const newGroupDataList = [...this.$store.state.group.list];
        newGroupDataList.push(group);
        this.$store.commit('group/SET_LIST', newGroupDataList);

        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Group Created Successfully');
        this.$emit('input', false);
        this.resetValidation();
        this.$nuxt.$router.push(`/profile/groups/${docRef.id}`);
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      }
    },
    loadValidation(): void {
      this.validation.addRule('name', (value: string) => ruleRequired(value));
      this.validation.addRule('name', (value: string) => ruleMinLength(value, 3));
      this.validation.addRule('image', (value: string) => ruleRequired(value));
    },
    resetValidation(): void {
      this.validation.reset();
      this.loadValidation();
    },
    clear(): void {
      this.name = '';
      this.image = '';
    },
  },
});
</script>

<style scoped lang="scss">

</style>
