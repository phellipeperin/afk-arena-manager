<template>
  <v-navigation-drawer
    :value="value"
    absolute
    temporary
    @input="changeOpenState"
  >
    <v-list
      v-for="section in filteredSections"
      :key="section.title"
      dense
      nav
    >
      <v-subheader>
        <span class="text-caption">{{ section.title }}</span>
      </v-subheader>
      <v-list-item
        v-for="menu in section.menus"
        :key="menu.link"
        color="secondary"
        :class="{'v-item--active v-list-item--active': isLinkActive(menu.activeLinks)}"
        @click="goTo(menu.link, menu.action)"
      >
        <v-list-item-icon v-if="menu.icon">
          <v-icon v-text="menu.icon" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="menu.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserRole } from '~/application/domain/user/user';

class SectionMenu {
  title: string;
  link: string;
  icon: string;
  activeLinks: Array<string>;
  role: UserRole | null;

  constructor(title: string, link: string, icon: string, activeLinks: Array<string>, role: UserRole | null) {
    this.title = title;
    this.link = link;
    this.icon = icon;
    this.activeLinks = activeLinks;
    this.role = role;
  }
}

class Section {
  title: string;
  menus: Array<SectionMenu>;

  constructor(title: string, menus: Array<SectionMenu>) {
    this.title = title;
    this.menus = menus;
  }
}

interface ComponentData {
  sections: Array<Section>;
}

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
  },
  data(): ComponentData {
    return {
      sections: [
        {
          title: 'Player',
          menus: [
            new SectionMenu('Heroes', '/player/heroes', 'mdi-sword-cross', ['/player/heroes'], 'PLAYER'),
            new SectionMenu('Resources', '/player/resources', 'mdi-cards', ['/player/resources'], 'PLAYER'),
          ],
        },
        {
          title: 'Information',
          menus: [
            new SectionMenu('Statistics', '/information/statistics', 'mdi-chart-arc', ['/information/statistics'], 'PLAYER'),
            new SectionMenu('Equipments', '/information/equipments', 'mdi-rhombus-split-outline', ['/information/equipments'], 'PLAYER'),
            new SectionMenu('Ladders', '/information/ladders', 'mdi-poll', ['/information/ladders'], 'PLAYER'),
          ],
        },
        {
          title: 'Admin',
          menus: [
            new SectionMenu('Heroes', '/admin/heroes', 'mdi-sword-cross', ['/admin/heroes'], 'ADMIN'),
          ],
        },
        {
          title: 'Account',
          menus: [
            new SectionMenu('Profile', '/account/profile', 'mdi-account-circle', ['/account/profile'], null),
            new SectionMenu('Friends', '/account/friends', 'mdi-account-group-outline', ['/account/friends'], null),
          ],
        },
      ],
    };
  },
  computed: {
    filteredSections(): Array<Section> {
      const filteredSections: Array<Section> = [];
      const currentUserRoles = this.$store.state.user.user.roles;
      this.sections.forEach((section: Section) => {
        const filteredMenus = section.menus.filter((menu: SectionMenu) => !menu.role || currentUserRoles.includes(menu.role));
        if (filteredMenus.length) {
          filteredSections.push({
            title: section.title,
            menus: filteredMenus,
          });
        }
      });
      return filteredSections;
    },
  },
  methods: {
    isLinkActive(activeLinks: Array<string>): boolean {
      return activeLinks.includes(this.$nuxt.$route.path);
    },
    goTo(link: string): void {
      this.$nuxt.$router.push(link);
    },
    changeOpenState(newState: boolean): void {
      this.$emit('input', newState);
    },
  },
});
</script>

<style scoped lang="scss">
</style>
