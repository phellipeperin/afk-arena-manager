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
            :disabled="!isAdmin"
            :rules="validation.getRules('groupData.name')"
            @keyup.enter="saveInfo"
            @update:error="(state) => validation.changeValidationState('groupData.name', state)"
          />
          <v-text-field
            v-model="groupData.image"
            color="primary"
            label="Image URL"
            :disabled="!isAdmin"
            :rules="validation.getRules('groupData.image')"
            @keyup.enter="saveInfo"
            @update:error="(state) => validation.changeValidationState('groupData.image', state)"
          />

          <v-btn
            v-if="isAdmin"
            block
            large
            color="accent"
            :disabled="requestActive"
            :loading="requestActive"
            @click="saveInfo"
          >
            Update Info
          </v-btn>
          <v-btn
            v-if="isAdmin"
            text
            small
            block
            color="error"
            class="mt-4"
            @click="confirmToRemove"
          >
            Delete Group
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
          const data = {
            name: this.groupData.name,
            image: this.groupData.image,
          };
          await docRef.update(data);

          const newGroupDataList = JSON.parse(JSON.stringify(this.$store.state.group.list));
          const index = newGroupDataList.findIndex((elem: Group) => elem.id === this.groupData.id);
          if (index !== -1) {
            newGroupDataList[index].name = this.groupData.name;
            newGroupDataList[index].image = this.groupData.image;
            this.$store.commit('group/SET_LIST', newGroupDataList);
          }
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
    confirmToRemove(): void {
      this.$store.commit('feedback/ASK_FOR_CONFIRMATION', {
        title: 'Remove Group',
        message: `Are you sure you want to remove the group ${this.groupData.name}? All members will also lose access to it.`,
        callback: this.remove,
      });
    },
    async remove(): Promise<void> {
      const groupDocRef = this.$fire.firestore.collection('groups').doc(this.groupData.id);
      const groupDoc = await groupDocRef.get();
      if (groupDoc.exists) {
        const groupData = groupDoc.data() || {};
        for (const member of groupData.members) {
          const memberDocRef = this.$fire.firestore.collection('users').doc(member.id);
          const memberDoc = await memberDocRef.get();
          if (memberDoc.exists) {
            const memberDocData = memberDoc.data() || {};
            memberDocData.groups = memberDocData.groups.filter((elem: string) => elem !== this.groupData.id);
            const newMemberData = {
              groups: JSON.parse(JSON.stringify(memberDocData.groups)),
            };
            await memberDocRef.update(newMemberData);
          }
        }
      }

      await groupDocRef.delete();

      const newGroupDataList = this.$store.state.group.list.filter((elem: Group) => elem.id !== this.groupData.id);
      this.$store.commit('group/SET_LIST', newGroupDataList);
      const newUserGroupList = this.$store.state.user.user.groups.filter((elem: string) => elem !== this.groupData.id);
      this.$store.commit('user/SET_GROUPS', newUserGroupList);

      this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Group Deleted Successfully');
      this.$nuxt.$router.push('/profile/groups/list');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
