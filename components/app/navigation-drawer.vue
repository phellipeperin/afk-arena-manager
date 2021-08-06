<template>
  <section>
    <v-navigation-drawer
      v-model="open"
      app
      :color="$vuetify.breakpoint.lgAndUp ? 'transparent' : 'white'"
    >
      <v-list
        v-for="section in filteredSections"
        :key="section.title"
        dense
        nav
      >
        <v-subheader>
          {{ section.title }}
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

    <v-btn
      v-if="$vuetify.breakpoint.mdAndDown"
      fab
      fixed
      left
      bottom
      large
      elevation="3"
      @click="open = true;"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserRole } from '~/application/domain/user/user';

type sectionMenuAction = 'NONE' | 'LOGOUT';

class SectionMenu {
  title: string;
  link: string;
  icon: string;
  activeLinks: Array<string>;
  role: UserRole | null;
  action?: sectionMenuAction;

  constructor(title: string, link: string, icon: string, activeLinks: Array<string>, role: UserRole | null, action: sectionMenuAction = 'NONE') {
    this.title = title;
    this.link = link;
    this.icon = icon;
    this.activeLinks = activeLinks;
    this.role = role;
    this.action = action;
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
  open: boolean;
  sections: Array<Section>;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      open: false,
      sections: [
        {
          title: 'Player',
          menus: [
            new SectionMenu('Heroes', '/player/heroes', 'mdi-sword-cross', ['/player/heroes'], 'PLAYER'),
            new SectionMenu('Statistics', '/player/statistics', 'mdi-chart-donut', ['/player/statistics'], 'PLAYER'),
            new SectionMenu('Ladder', '/player/ladder', 'mdi-poll', ['/player/ladder'], 'PLAYER'),
            // new SectionMenu('Achievements', '/player/achievements', 'mdi-medal-outline', ['/player/achievements'], 'PLAYER'),
          ],
        },
        {
          title: 'Progress',
          menus: [
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
            new SectionMenu('Change Password', '/account/change-password', 'mdi-lock-outline', ['/account/change-password'], null),
            new SectionMenu('Logout', '', 'mdi-logout', [], null, 'LOGOUT'),
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
    goTo(link: string, action: sectionMenuAction): void {
      if (action === 'NONE') {
        this.$nuxt.$router.push(link);
        return;
      }
      if (action === 'LOGOUT') {
        this.$fire.auth.signOut().then(() => {
          this.$nuxt.$router.replace('/');
        });
      }
    },
  },
});
</script>

<style scoped lang="scss">

</style>
