<template>
  <app-dialog
    :value="value"
    title="Add Friend"
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
            v-model="friendId"
            autofocus
            color="primary"
            label="Friend ID"
            :disabled="!!friend.id"
            :rules="validation.getRules('id')"
            @update:error="(state) => validation.changeValidationState('id', state)"
          />
          <v-text-field
            v-if="friend.id"
            :value="friend.systemInfo.nickname"
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
            v-if="!friend.id"
            block
            color="accent"
            :disabled="!canSearch"
            @click="search"
          >
            Search
          </v-btn>
          <ui-avatar
            v-if="friend.id"
            :photo-url="friend.systemInfo.photoUrl"
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
        :disabled="!friend.id"
        @click="saveUpdate"
      >
        Confirm and Add
      </v-btn>
    </template>
  </app-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleRequired } from '~/application/services/validationService';
import User from '~/application/domain/user/user';
import UserSystemInfo from '~/application/domain/user/userSystemInfo';

interface ComponentData {
  validation: Validation;
  friendId: string;
  friend: User;
}

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
  },
  data(): ComponentData {
    return {
      validation: new Validation(),
      friendId: '',
      friend: new User(),
    };
  },
  computed: {
    canSearch(): boolean {
      return !this.validation.hasAnyError && !!this.friendId;
    },
  },
  watch: {
    value: {
      handler(): void {
        this.friendId = '';
        this.friend = new User();
      },
    },
  },
  created(): void {
    this.loadValidation();
  },
  methods: {
    cancel(): void {
      this.$emit('input', false);
      this.friendId = '';
      this.friend = new User();
      this.resetValidation();
    },
    async search(): Promise<void> {
      if (!this.validation.hasAnyError) {
        if (this.friendId === this.$store.state.user.user.id) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'You can not add yourself as a friend.');
          return;
        }

        if ((this.$store.state.user.user.friends || []).includes(this.friendId)) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'Friend already added.');
          return;
        }

        if ((this.$store.state.user.user.friends || []).length >= 12) {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'Maximum friends limit reached.');
          return;
        }

        const docRef = this.$fire.firestore.collection('users').doc(this.friendId);
        const doc = await docRef.get();
        if (doc.exists) {
          const data = doc.data();
          this.friend.id = doc.id;
          this.friend.systemInfo = data?.systemInfo || new UserSystemInfo();
        } else {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'User not found. Please double check the ID');
        }
      }
    },
    async saveUpdate(): Promise<void> {
      try {
        const newFriendList = [...(this.$store.state.user.user.friends || [])];
        newFriendList.push(this.friendId);
        const docRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
        const data = {
          friends: JSON.parse(JSON.stringify(newFriendList)),
        };
        await docRef.update(data);
        this.$store.commit('user/SET_FRIENDS', newFriendList);

        const newFriendDataList = [...this.$store.state.friend.list];
        newFriendDataList.push(this.friend);
        this.$store.commit('friend/SET_LIST', newFriendDataList);

        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Friend Added Successfully');
        this.$emit('input', false);
        this.friendId = '';
        this.friend = new User();
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
