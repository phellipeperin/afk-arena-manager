<template>
  <div>
    <app-dialog
      :value="value"
      title="New Friend"
      max-width="600"
      @input="cancel"
    >
      <v-row>
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            v-model="friendId"
            autofocus
            label="Friend ID"
            :rules="validation.getRules('id')"
            @update:error="(state) => validation.changeValidationState('id', state)"
          />
          <v-text-field
            v-if="friend.id"
            :value="friend.gameInfo.nickname"
            disabled
            label="Nickname"
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
          class="pt-6"
        >
          <v-btn
            v-if="!friend.id"
            block
            color="primary"
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


      <template #actions>
        <v-btn
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!friend.id"
          @click="saveUpdate"
        >
          Confirm and Add
        </v-btn>
      </template>
    </app-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Validation, { ruleRequired } from '~/application/services/validationService';
import User from '~/application/domain/user/user';

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
      return !this.validation.hasAnyError && this.friendId;
    },
  },
  created() {
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
        const docRef = this.$fire.firestore.collection('users').doc(this.friendId);
        if (docRef.exists) {
          const data = docRef.data();
          this.friend.id = data.id;
          this.friend.systemInfo = data.systemInfo;
          this.friend.gameInfo = data.gameInfo;
        } else {
          this.$store.commit('feedback/SHOW_ERROR_MESSAGE', 'User not found. Please double check the ID');
        }
      }
    },
    async saveUpdate(): Promise<void> {
      const heroId = this.$store.state.hero.hero.id;
      try {
        const docRef = this.$fire.firestore.collection('heroes').doc(heroId);
        const heroData = {
          gameInfo: JSON.parse(JSON.stringify(this.$store.state.hero.hero.gameInfo)),
          systemInfo: JSON.parse(JSON.stringify(this.$store.state.hero.hero.systemInfo)),
        };
        await docRef.set(heroData);
        this.$emit('input', false);
        this.$store.commit('hero/UPDATE_HERO', new Hero(heroId, heroData.gameInfo, heroData.systemInfo));
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Hero Saved Successfully');
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
