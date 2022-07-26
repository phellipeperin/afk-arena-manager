<template>
  <app-dialog
    :value="value"
    title="Add Member"
    max-width="600"
    @input="cancel"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            v-model="playerId"
            autofocus
            color="primary"
            label="Player ID"
            :disabled="!!player.id"
            :rules="validation.getRules('id')"
            @update:error="(state) => validation.changeValidationState('id', state)"
          />
          <v-text-field
            v-if="player.id"
            :value="player.systemInfo.nickname"
            disabled
            label="Nickname"
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
          class="pt-6 d-flex justify-center"
        >
          <v-btn
            v-if="!player.id"
            block
            color="accent"
            :disabled="!canSearch"
            @click="search"
          >
            Search
          </v-btn>
          <ui-avatar
            v-if="player.id"
            :photo-url="player.systemInfo.photoUrl"
          />
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <v-btn
        text
        :disabled="activeRequest"
        :loading="activeRequest"
        @click="cancel"
      >
        Cancel
      </v-btn>
      <v-btn
        color="accent"
        :disabled="!player.id || activeRequest"
        :loading="activeRequest"
        @click="saveUpdate"
      >
        Confirm and Add
      </v-btn>
    </template>
  </app-dialog>
</template>

<script lang="ts">
// TODO -- refactor this file so to re-use friend-add-dialog
import Vue from 'vue';
import Validation, { ruleRequired } from '~/application/services/validationService';
import User from '~/application/domain/user/user';
import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import GroupMember from '~/application/domain/group/groupMember';

interface ComponentData {
  validation: Validation;
  playerId: string;
  player: User;
  activeRequest: boolean;
}

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
    groupId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      validation: new Validation(),
      playerId: '',
      player: new User(),
      activeRequest: false,
    };
  },
  computed: {
    canSearch(): boolean {
      return !this.validation.hasAnyError && !!this.playerId;
    },
  },
  watch: {
    value: {
      handler(): void {
        this.playerId = '';
        this.player = new User();
      },
    },
  },
  created(): void {
    this.loadValidation();
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.playerId = '';
      this.player = new User();
      this.resetValidation();
    },
    async search(): Promise<void> {
      if (!this.validation.hasAnyError) {
        if (this.playerId === this.$store.state.user.user.id) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'You are already a part of this group.');
          return;
        }

        if ((this.$store.state.user.user.players || []).includes(this.playerId)) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'Player already added to this group.');
          return;
        }

        if ((this.$store.state.user.user.players || []).length >= 70) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'Maximum number of members reached.');
          return;
        }

        const docRef = this.$fire.firestore.collection('users').doc(this.playerId);
        const doc = await docRef.get();
        if (doc.exists) {
          const data = doc.data();
          this.player.id = doc.id;
          this.player.systemInfo = data?.systemInfo || new UserSystemInfo();
        } else {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'Player not found. Please double check the ID');
        }
      }
    },
    async saveUpdate(): Promise<void> {
      try {
        this.activeRequest = true;
        const docRef = await this.$fire.firestore.collection('groups').doc(this.groupId);
        const doc = await docRef.get();
        if (doc.exists) {
          const data = doc.data();
          data.members.push(JSON.parse(JSON.stringify(new GroupMember(this.player.id, 'MEMBER'))));
          await docRef.update(data);
        }

        const userDocRef = this.$fire.firestore.collection('users').doc(this.player.id);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          if (!userData.groups?.length) {
            userData.groups = [this.groupId];
          } else {
            userData.groups.push(this.groupId);
          }
          await userDocRef.update(userData);
        }

        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Player Added Successfully');
        this.$emit('input', false);
        this.$emit('addSuccess');
        this.playerId = '';
        this.player = new User();
        this.activeRequest = false;
        this.resetValidation();
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      }
    },
    loadValidation(): void {
      this.validation.addRule('id', (value: string) => ruleRequired(value));
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
