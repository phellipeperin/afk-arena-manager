<template>
  <div>
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
        />
      </template>

      <template #user>
        <hero-list
          show-filter
          :player-id="$store.state.user.user.id"
          @select="openHeroDialog"
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
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Heroes',
      heroFilterEnabled: true,
      compareEnabled: true,
    });
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
  },
});
</script>

<style scoped lang="scss">

</style>
