<template>
  <div>
    <ui-page-header title="Resources">
      <app-compare-buttons
        :on-compare="onCompare"
        @update="setCompare"
      />
      <template #explanation>
        <h6 class="text-h6">
          Elder Tree
        </h6>
        <p class="text-body-2">
          Please be aware that if you ever used the swap scroll on your heroes, the tree calculated here can be different from the one in the game.
        </p>
        <p class="text-body-2">
          That happens because after using the swap scroll, the game doesn't remove the droplets earned from the hero that was reverted, giving an inaccurate result.
        </p>
      </template>
    </ui-page-header>

    <app-compare-container
      :on-compare="onCompare"
      @changeFriendOne="changeFriendOne"
      @changeFriendTwo="changeFriendTwo"
    >
      <template #fallback>
        <resources-container :player-id="$store.state.user.user.id" />
      </template>

      <template #user>
        <resources-container
          on-compare
          :player-id="$store.state.user.user.id"
        />
      </template>

      <template #friend-one>
        <resources-container
          on-compare
          disabled
          :player-id="friendOneId"
        />
      </template>

      <template #friend-two>
        <resources-container
          on-compare
          disabled
          :player-id="friendOneTwo"
        />
      </template>
    </app-compare-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
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
      onCompare: false,
      friendOneId: '',
      friendOneTwo: '',
    };
  },
  methods: {
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
