<template>
  <v-row>
    <v-col
      cols="3"
      class="d-flex align-center justify-center"
    >
      <img
        :src="image"
        alt="icon"
        class="icon"
      >
    </v-col>
    <v-col
      cols="9"
    >
      <v-row>
        <v-col
          v-for="(position, index) in orderedPositions"
          :key="`podium-positions-${index}`"
          cols="6"
          sm="3"
          class="d-flex align-center justify-center flex-column"
        >
          <div>
            <ui-avatar
              v-for="user in position.users"
              :key="user.id"
              size="48"
              :photo-url="user.systemInfo.photoUrl"
              class="avatar"
            />
          </div>
          <v-progress-linear
            :color="getColorByIndex(index)"
            :value="100 * position.amount / podium.totalPossible"
            class="mt-2"
          />
          <span class="text-amount text-overline">{{ position.amount }}</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import LadderItem from '~/application/domain/ladder/ladderItem';
import LadderItemPosition from '~/application/domain/ladder/ladderItemPosition';

export default Vue.extend({
  props: {
    image: { type: String, required: true },
    podium: { type: LadderItem, required: true },
  },
  computed: {
    orderedPositions(): Array<LadderItemPosition> {
      const newList: Array<LadderItemPosition> = [...this.podium.positions];
      newList.sort((a: LadderItemPosition, b: LadderItemPosition) => {
        return b.amount - a.amount;
      });
      return newList;
    },
  },
  methods: {
    getColorByIndex(index: number): string {
      if (index === 0) { return 'gold'; }
      if (index === 1) { return 'silver'; }
      if (index === 2) { return 'bronze'; }
      return 'none';
    },
  },
});
</script>

<style scoped lang="scss">
.icon {
  width: 32px;
  height: 32px;
}

.avatar {
  margin: 0 -8px;

  &:first-child {
    z-index: 9;
  }
}

.text-amount {
  margin-top: -8px;
}
</style>
