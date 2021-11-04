<template>
  <ui-card
    :elevation="onCompare ? '0' : undefined"
    :outlined="onCompare"
    title="Elder Tree"
  >
    <v-container>
      <v-row>
        <v-col
          cols="6"
          class="text-right"
        >
          <h6 class="text-h6">
            Tree Main Level
          </h6>
        </v-col>
        <v-col
          cols="6"
          class="d-flex align-center"
        >
          <span class="text-subtitle font-weight-bold">Lv. {{ elderTreeMain.level }}</span>
          <span class="text-subtitle-2 ml-2">({{ elderTreeMain.droplets }} droplets)</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
          class="d-flex align-center justify-center"
        >
          <img
            width="52"
            :src="supportImage"
            alt="support"
          >
        </v-col>
        <v-col
          cols="9"
          class="d-flex align-center"
        >
          <v-slider
            v-model="elderTree.support"
            :label="`Lv. ${elderTree.support}`"
            :disabled="disabled"
            hide-details
            ticks="always"
            :thumb-size="24"
            :min="0"
            :max="maxPossibleLevel"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
          class="d-flex align-center justify-center"
        >
          <img
            width="52"
            :src="mageImage"
            alt="mage"
          >
        </v-col>
        <v-col
          cols="9"
          class="d-flex align-center"
        >
          <v-slider
            v-model="elderTree.mage"
            :label="`Lv. ${elderTree.mage}`"
            :disabled="disabled"
            hide-details
            ticks="always"
            :thumb-size="24"
            :min="0"
            :max="maxPossibleLevel"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
          class="d-flex align-center justify-center"
        >
          <img
            width="52"
            :src="warriorImage"
            alt="warrior"
          >
        </v-col>
        <v-col
          cols="9"
          class="d-flex align-center"
        >
          <v-slider
            v-model="elderTree.warrior"
            :label="`Lv. ${elderTree.warrior}`"
            :disabled="disabled"
            hide-details
            ticks="always"
            :thumb-size="24"
            :min="0"
            :max="maxPossibleLevel"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
          class="d-flex align-center justify-center"
        >
          <img
            width="52"
            :src="tankImage"
            alt="tank"
          >
        </v-col>
        <v-col
          cols="9"
          class="d-flex align-center"
        >
          <v-slider
            v-model="elderTree.tank"
            :label="`Lv. ${elderTree.tank}`"
            :disabled="disabled"
            hide-details
            ticks="always"
            :thumb-size="24"
            :min="0"
            :max="maxPossibleLevel"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
          class="d-flex align-center justify-center"
        >
          <img
            width="52"
            :src="rangerImage"
            alt="ranger"
          >
        </v-col>
        <v-col
          cols="9"
          class="d-flex align-center"
        >
          <v-slider
            v-model="elderTree.ranger"
            :label="`Lv. ${elderTree.ranger}`"
            :disabled="disabled"
            hide-details
            ticks="always"
            :thumb-size="24"
            :min="0"
            :max="maxPossibleLevel"
          />
        </v-col>
      </v-row>
    </v-container>

    <template
      v-if="!disabled"
      #actions
    >
      <v-btn
        raised
        large
        color="primary"
        :disabled="requestActive"
        :loading="requestActive"
        @click="update"
      >
        Update
      </v-btn>
    </template>
  </ui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadGroupImage } from '~/application/services/imageService';
import { Group } from '~/application/domain/info/group';
import ResourceElderTree, { ResourceElderTreeMain } from '~/application/domain/resources/resourceElderTree';
import { calculateCurrentElderTree } from '~/application/services/resource/resourceElderTreeService';

interface ComponentData {
  requestActive: boolean;
  elderTree: ResourceElderTree;
  elderTreeMain: ResourceElderTreeMain;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    onCompare: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      requestActive: false,
      elderTree: new ResourceElderTree(),
      elderTreeMain: { level: 0, droplets: 0 },
    };
  },
  computed: {
    maxPossibleLevel(): number {
      return this.elderTreeMain.level - 10 >= 0 ? this.elderTreeMain.level : 0;
    },
    supportImage(): string {
      return loadGroupImage(Group.Support);
    },
    mageImage(): string {
      return loadGroupImage(Group.Mage);
    },
    warriorImage(): string {
      return loadGroupImage(Group.Warrior);
    },
    tankImage(): string {
      return loadGroupImage(Group.Tank);
    },
    rangerImage(): string {
      return loadGroupImage(Group.Ranger);
    },
  },
  created(): void {
    const heroes = this.$store.getters['hero/baseHeroList'](this.playerId);
    if (heroes && heroes.length) {
      const resources = this.$store.getters['resource/playerResources'](this.playerId);

      this.elderTree = resources.elderTree;
      this.elderTreeMain = calculateCurrentElderTree(heroes);
    }
  },
  methods: {
    async update(): Promise<void> {
      try {
        this.requestActive = true;
        const docRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
        const currentResources = this.$store.getters['resource/playerResources'](this.playerId);
        const data = {
          resources: { ...currentResources, elderTree: JSON.parse(JSON.stringify(this.elderTree)) },
        };
        await docRef.update(data);
        this.$store.commit('resource/UPDATE_ELDER_TREE', data);
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Elder Tree Updated Successfully');
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
