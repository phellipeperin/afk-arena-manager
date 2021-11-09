<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <ui-card title="Faction">
          <v-container fluid>
            <ladder-podium-item
              v-for="(podium, index) in ladder.faction"
              :key="`podium-faction-${index}`"
              :image="loadFactionImage(podium.faction)"
              :podium="podium"
            />
          </v-container>
        </ui-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <ui-card title="Group">
          <v-container fluid>
            <ladder-podium-item
              v-for="(podium, index) in ladder.group"
              :key="`podium-group-${index}`"
              :image="loadGroupImage(podium.group)"
              :podium="podium"
            />
          </v-container>
        </ui-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <ui-card title="Type">
          <v-container fluid>
            <ladder-podium-item
              v-for="(podium, index) in ladder.type"
              :key="`podium-type-${index}`"
              :image="loadTypeImage(podium.type)"
              :podium="podium"
            />
          </v-container>
        </ui-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <ui-card title="Role">
          <v-container fluid>
            <ladder-podium-item
              v-for="(podium, index) in ladder.role"
              :key="`podium-role-${index}`"
              :image="loadRoleImage(podium.role)"
              :podium="podium"
            />
          </v-container>
        </ui-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Ladder from '~/application/domain/ladder/ladder';
import { loadFactionImage, loadGroupImage, loadRoleImage, loadTypeImage } from '~/application/services/imageService';
import { Faction } from '~/application/domain/info/faction';
import { Role } from '~/application/domain/info/role';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';

export default Vue.extend({
  props: {
    ladder: { type: Ladder, required: true },
  },
  methods: {
    loadFactionImage(faction: Faction): string {
      return loadFactionImage(faction);
    },
    loadGroupImage(group: Group): string {
      return loadGroupImage(group);
    },
    loadTypeImage(type: Type): string {
      return loadTypeImage(type);
    },
    loadRoleImage(role: Role): string {
      return loadRoleImage(role);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
