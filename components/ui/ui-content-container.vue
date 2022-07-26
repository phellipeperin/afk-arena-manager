<template>
  <section class="content-container py-4 px-2">
    <v-container fluid>
      <v-row v-if="!$store.state.compare.onCompare">
        <v-col cols="12">
          <ui-card-skeleton-loader v-if="loadingUser" />
          <section v-else>
            <slot />
          </section>
        </v-col>
      </v-row>

      <v-row v-if="$store.state.compare.onCompare">
        <v-col
          v-if="$vuetify.breakpoint.mdAndDown"
          cols="12"
          class="d-flex justify-center"
        >
          <v-btn-toggle
            v-model="userVisibleOnMobile"
            mandatory
          >
            <v-btn>
              <ui-avatar
                :photo-url="$store.state.user.user.systemInfo.photoUrl"
                size="32"
              />
              <p class="ml-2 mb-0">
                Me
              </p>
            </v-btn>
            <v-btn
              v-for="(friend, index) in $store.state.compare.friends"
              :key="`${friend.id}_${index}_menu`"
            >
              <ui-avatar
                v-if="friend.id"
                :photo-url="friend.systemInfo.photoUrl"
                size="32"
              />
              <p class="ml-2 mb-0">
                {{ friend.id ? friend.systemInfo.nickname : `Friend ${index + 1}` }}
              </p>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col
          v-show="isUserVisible(0)"
          cols="12"
          lg="4"
        >
          <ui-card title="Me">
            <template #toolbar-info>
              <ui-avatar
                :photo-url="$store.state.user.user.systemInfo.photoUrl"
                size="32"
              />
            </template>

            <section class="px-2 py-4">
              <v-skeleton-loader
                v-if="loadingUser"
                type="card"
              />
              <article v-else>
                <slot />
              </article>
            </section>
          </ui-card>
        </v-col>
        <v-col
          v-for="(friend, index) in $store.state.compare.friends"
          v-show="isUserVisible(index + 1)"
          :key="`${friend.id}_${index}`"
          cols="12"
          lg="4"
        >
          <ui-card :title="friend.id ? friend.systemInfo.nickname : 'Select Friend'">
            <template #toolbar-info>
              <ui-avatar
                v-if="friend.id"
                :photo-url="friend.systemInfo.photoUrl"
                size="32"
              />
              <v-btn
                v-if="friend.id"
                icon
                small
                @click="removeFriend(index)"
              >
                <v-icon
                  small
                  dark
                >
                  mdi-close
                </v-icon>
              </v-btn>
            </template>

            <div
              v-if="!friend.id"
              class="px-4 pt-2"
            >
              <v-skeleton-loader
                v-if="loadingFriends[index]"
                type="card"
              />
              <v-select
                v-else
                :value="friend.id"
                :items="friendItemList"
                item-text="label"
                item-value="value"
                label="Please Select"
                @input="(value) => selectFriend(index, value)"
              />
            </div>
            <section
              v-else
              class="px-2 py-4"
            >
              <slot
                name="friend"
                :friend="friend"
              />
            </section>
          </ui-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';

interface ComponentData {
  userVisibleOnMobile: number;
  loadingUser: boolean;
  loadingFriends: Array<boolean>;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      userVisibleOnMobile: 0,
      loadingUser: true,
      loadingFriends: [false, false, false],
    };
  },
  computed: {
    friendItemList() {
      return this.$store.state.friend.list.filter((elem: User) => this.$store.state.compare.friends.findIndex((friendElem: User) => friendElem.id === elem.id) === -1).map((elem: User) => ({ value: elem.id, label: elem.systemInfo.nickname }));
    },
  },
  async created(): Promise<void> {
    await this.loadHeroesFromUser(this.$store.state.user.user.id);
    setTimeout(() => {
      this.loadingUser = false;
    }, 50);
  },
  methods: {
    isUserVisible(index: number): boolean {
      return this.$vuetify.breakpoint.lgAndUp || this.userVisibleOnMobile === index;
    },
    async selectFriend(index: number, id: string): Promise<void> {
      this.loadingFriends[index] = true;
      this.$forceUpdate();
      const friend = this.$store.state.friend.list.find((elem: User) => elem.id === id) || new User();
      await this.loadHeroesFromUser(friend.id);

      setTimeout(() => {
        this.loadingFriends[index] = false;
        this.$store.commit('compare/SET_FRIEND', { index, friend });
      }, 50);
    },
    removeFriend(index: number): void {
      this.$store.commit('compare/SET_FRIEND', { index, friend: new User() });
    },
    async loadHeroesFromUser(userId: string): Promise<void> {
      if (userId) {
        const heroList = this.$store.getters['hero/baseHeroList'](userId);
        if (!heroList.length) {
          await this.$store.dispatch('hero/loadHeroesForUser', userId);
          await this.$store.dispatch('hero/loadPersonalObjectiveHeroes', userId);
        }
        for (const groupId of this.$store.state.user.user.groups) {
          const groupHeroList = this.$store.getters['hero/objectiveHeroList'](groupId);
          if (!groupHeroList.length) {
            await this.$store.dispatch('hero/loadGroupObjectiveHeroes', groupId);
          }
        }
      }
      await this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
    },
  },
});
</script>

<style scoped lang="scss">
.content-container {
  animation: 1s appear;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
