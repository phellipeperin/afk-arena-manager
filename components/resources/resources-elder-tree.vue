<template>
  <article>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          class="d-flex align-center"
        >
          <h6 class="text-h6">
            Tree Level
          </h6>
          <span class="text-subtitle font-weight-bold ml-6">Lv. {{ elderTreeMain.level }}</span>
          <span class="text-subtitle-2 ml-2">({{ elderTreeMain.droplets }} droplets)</span>
        </v-col>
      </v-row>

      <resources-elder-tree-branch
        v-model="elderTree.support"
        :image="supportImage"
        :disabled="disabled"
        :max-level="maxPossibleLevel"
      />
      <resources-elder-tree-branch
        v-model="elderTree.mage"
        :image="mageImage"
        :disabled="disabled"
        :max-level="maxPossibleLevel"
      />
      <resources-elder-tree-branch
        v-model="elderTree.warrior"
        :image="warriorImage"
        :disabled="disabled"
        :max-level="maxPossibleLevel"
      />
      <resources-elder-tree-branch
        v-model="elderTree.tank"
        :image="tankImage"
        :disabled="disabled"
        :max-level="maxPossibleLevel"
      />
      <resources-elder-tree-branch
        v-model="elderTree.ranger"
        :image="rangerImage"
        :disabled="disabled"
        :max-level="maxPossibleLevel"
      />

      <v-row v-if="!disabled">
        <v-col
          cols="12"
          sm="4"
          lg="2"
          offset-sm="4"
          offset-lg="5"
        >
          <v-btn
            large
            block
            color="accent"
            :disabled="requestActive"
            :loading="requestActive"
            @click="update"
          >
            Update
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadDivisionImage } from '~/application/services/imageService';
import { Division } from '~/application/domain/info/division';
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
      return loadDivisionImage(Division.Support);
    },
    mageImage(): string {
      return loadDivisionImage(Division.Mage);
    },
    warriorImage(): string {
      return loadDivisionImage(Class.Warrior);
    },
    tankImage(): string {
      return loadClassImage(Class.Tank);
    },
    rangerImage(): string {
      return loadClassImage(Class.Ranger);
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
