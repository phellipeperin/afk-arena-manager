<template>
  <ui-card
    :elevation="onCompare ? '0' : undefined"
    :outlined="onCompare"
    title="Artifacts"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div class="d-flex flex-wrap">
            <resources-artifact-item
              v-for="artifact in durasArtifacts"
              :key="artifact.id"
              :image="loadArtifactImage(artifact.id)"
              :stars="artifact.stars"
              :on-compare="onCompare"
              :disabled="disabled"
              @update="(value) => updateStars(artifact.id, value)"
            />
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex flex-wrap">
            <resources-artifact-item
              v-for="artifact in supportArtifacts"
              :key="artifact.id"
              :image="loadArtifactImage(artifact.id)"
              :stars="artifact.stars"
              :on-compare="onCompare"
              :disabled="disabled"
              @update="(value) => updateStars(artifact.id, value)"
            />
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex flex-wrap">
            <resources-artifact-item
              v-for="artifact in mageArtifacts"
              :key="artifact.id"
              :image="loadArtifactImage(artifact.id)"
              :stars="artifact.stars"
              :on-compare="onCompare"
              :disabled="disabled"
              @update="(value) => updateStars(artifact.id, value)"
            />
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex flex-wrap">
            <resources-artifact-item
              v-for="artifact in warriorArtifacts"
              :key="artifact.id"
              :image="loadArtifactImage(artifact.id)"
              :stars="artifact.stars"
              :on-compare="onCompare"
              :disabled="disabled"
              @update="(value) => updateStars(artifact.id, value)"
            />
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex flex-wrap">
            <resources-artifact-item
              v-for="artifact in tankArtifacts"
              :key="artifact.id"
              :image="loadArtifactImage(artifact.id)"
              :stars="artifact.stars"
              :on-compare="onCompare"
              :disabled="disabled"
              @update="(value) => updateStars(artifact.id, value)"
            />
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex flex-wrap">
            <resources-artifact-item
              v-for="artifact in rangerArtifacts"
              :key="artifact.id"
              :image="loadArtifactImage(artifact.id)"
              :stars="artifact.stars"
              :on-compare="onCompare"
              :disabled="disabled"
              @update="(value) => updateStars(artifact.id, value)"
            />
          </div>
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
import { loadArtifactImage } from '~/application/services/imageService';
import ResourceArtifact, { Artifact } from '~/application/domain/resources/resourceArtifact';
import { Group } from '~/application/domain/info/group';

interface ComponentData {
  requestActive: boolean;
  artifacts: Array<ResourceArtifact>;
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
      artifacts: [],
    };
  },
  computed: {
    durasArtifacts(): Array<ResourceArtifact> {
      return this.artifacts.filter((elem: ResourceArtifact) => !elem.group);
    },
    supportArtifacts(): Array<ResourceArtifact> {
      return this.artifacts.filter((elem: ResourceArtifact) => elem.group === Group.Support);
    },
    mageArtifacts(): Array<ResourceArtifact> {
      return this.artifacts.filter((elem: ResourceArtifact) => elem.group === Group.Mage);
    },
    warriorArtifacts(): Array<ResourceArtifact> {
      return this.artifacts.filter((elem: ResourceArtifact) => elem.group === Group.Warrior);
    },
    tankArtifacts(): Array<ResourceArtifact> {
      return this.artifacts.filter((elem: ResourceArtifact) => elem.group === Group.Tank);
    },
    rangerArtifacts(): Array<ResourceArtifact> {
      return this.artifacts.filter((elem: ResourceArtifact) => elem.group === Group.Ranger);
    },
  },
  created(): void {
    const resources = this.$store.getters['resource/playerResources'](this.playerId);
    this.artifacts = resources.artifacts;
  },
  methods: {
    async update(): Promise<void> {
      try {
        this.requestActive = true;
        const docRef = this.$fire.firestore.collection('users').doc(this.$store.state.user.user.id);
        const currentResources = this.$store.getters['resource/playerResources'](this.playerId);
        const data = {
          resources: { ...currentResources, artifacts: JSON.parse(JSON.stringify(this.artifacts)) },
        };
        await docRef.update(data);
        this.$store.commit('resource/UPDATE_ARTIFACTS', data);
        this.$store.commit('feedback/SHOW_SUCCESS_MESSAGE', 'Artifacts Updated Successfully');
      } catch (e) {
        this.$store.commit('feedback/SHOW_ERROR_MESSAGE', e);
      } finally {
        this.requestActive = false;
      }
    },
    updateStars(id: Artifact, stars: number): void {
      const index = this.artifacts.findIndex((elem: ResourceArtifact) => elem.id === id);
      if (index !== -1) {
        this.artifacts[index].stars = stars;
      }
    },
    loadArtifactImage(id: Artifact): string {
      return loadArtifactImage(id);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
