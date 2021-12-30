<template>
<!--  <ui-card>-->
<!--    <ui-avatar-->
<!--      :photo-url="friend.systemInfo.photoUrl"-->
<!--      size="42"-->
<!--    />-->
<!--    <span class="text-h6 ml-2">{{ friend.systemInfo.nickname }}</span>-->

<!--    <template #actions>-->
<!--      <v-btn-->
<!--        small-->
<!--        text-->
<!--        color="error"-->
<!--        @click="remove"-->
<!--      >-->
<!--        Remove-->
<!--      </v-btn>-->
<!--    </template>-->
<!--  </ui-card>-->
  <v-banner
    single-line
  >
    <ui-avatar
      :photo-url="friend.systemInfo.photoUrl"
      size="42"
    />
    <span class="text-h6 ml-2">{{ friend.systemInfo.nickname }}</span>

    <template #actions>
      <v-btn
        small
        text
        color="error"
        @click="remove"
      >
        Remove
      </v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

export default Vue.extend({
  props: {
    friend: { type: User, required: true },
  },
  methods: {
    remove(): void {
      this.$emit('remove');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
