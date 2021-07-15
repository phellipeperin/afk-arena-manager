<template>
  <div>
    <ui-page-header
      title="Heroes"
      :subtitle="pageSubtitle"
    >
      <app-compare-buttons
        :on-compare="onCompare"
        @update="setCompare"
      />
    </ui-page-header>

    <app-compare-container
      :on-compare="onCompare"
      @changeFriendOne="changeFriendOne"
      @changeFriendTwo="changeFriendTwo"
    >
      <template #fallback>
        <hero-list
          show-filter
          :player-id="$store.state.user.user.id"
          @select="openHeroDialog"
          @update="updatePageSubtitle"
        />
      </template>

      <template #user>
        <hero-list
          show-filter
          :player-id="$store.state.user.user.id"
          @select="openHeroDialog"
          @update="updatePageSubtitle"
        />
      </template>

      <template #friend-one>
        <hero-list :player-id="friendOneId" />
      </template>

      <template #friend-two>
        <hero-list :player-id="friendOneTwo" />
      </template>
    </app-compare-container>

    <hero-player-dialog v-model="dialogOpen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  dialogOpen: boolean;
  pageSubtitle: string;
  onCompare: boolean;
  friendOneId: string;
  friendOneTwo: string;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      dialogOpen: false,
      onCompare: false,
      pageSubtitle: '',
      friendOneId: '',
      friendOneTwo: '',
    };
  },
  methods: {
    openHeroDialog(): void {
      this.dialogOpen = true;
    },
    setCompare(state: boolean): void {
      this.onCompare = state;
    },
    changeFriendOne(id: string): void {
      this.friendOneId = id;
    },
    changeFriendTwo(id: string): void {
      this.friendOneTwo = id;
    },
    updatePageSubtitle(total: number, filtered: number): void {
      this.pageSubtitle = this.onCompare ? '' : `Showing ${filtered} of ${total} heroes`;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
