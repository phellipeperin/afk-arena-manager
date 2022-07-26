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
        >
          <v-switch
            v-model="settings.darkTheme"
            label="Dark Theme"
          />

          <v-switch
            v-model="settings.heroTooltip"
            label="Show Hero Preview Tooltip"
          />

          <v-btn
            large
            block
            color="accent"
            :loading="requestActive"
            :disabled="requestActive"
            @click="updateSettings"
          >
            Apply and Update
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import UserSystemSettings from '~/application/domain/user/userSystemSettings';

interface ComponentData {
  requestActive: boolean;
  settings: UserSystemSettings;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      requestActive: false,
      settings: new UserSystemSettings(),
    };
  },
  created(): void {
    this.settings = JSON.parse(JSON.stringify(this.$store.state.user.user.systemSettings));
  },
  methods: {
    async updateSettings(): Promise<void> {
      try {
        this.requestActive = true;
        const copiedSettings = JSON.parse(JSON.stringify(this.settings));

        const docRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
        const data = {
          systemSettings: copiedSettings,
        };
        await docRef.update(data);
        this.$store.commit('user/SET_SYSTEM_SETTINGS', copiedSettings);
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Settings Updated Successfully');
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      } finally {
        this.requestActive = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">

</style>
