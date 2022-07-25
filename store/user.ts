import Firebase from 'firebase';
import Hero from '~/application/domain/hero/hero';
import User, { UserRole } from '~/application/domain/user/user';
import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import Group from '~/application/domain/group/group';
import { convertFirebaseHeroList } from '~/application/services/firebaseConverterService';
import { Filter } from '~/store/filter';
import Resources from '~/application/domain/resources/resources';
import UserSystemSettings from '~/application/domain/user/userSystemSettings';

interface State {
  user: User;
  isUserLoaded: boolean;
}

export const state = (): State => ({
  user: new User(),
  isUserLoaded: false,
});

export const mutations = {
  SET_NEW_USER: (state: State, { id, email }: User) => {
    state.user = new User();
    state.user.id = id;
    state.user.email = email;
  },
  CLEAR_USER: (state: State) => {
    state.user = new User();
    state.isUserLoaded = false;
  },
  SET_IS_USER_LOADED: (state: State, isLoaded: boolean) => {
    state.isUserLoaded = isLoaded;
  },
  SET_ROLES: (state: State, roles: Array<UserRole>) => {
    state.user.roles = roles;
  },
  SET_SYSTEM_INFO: (state: State, systemInfo: UserSystemInfo) => {
    state.user.systemInfo = systemInfo;
  },
  SET_SYSTEM_SETTINGS: (state: State, systemSettings: UserSystemSettings) => {
    state.user.systemSettings = systemSettings;
  },
  SET_FRIENDS: (state: State, friends: Array<string>) => {
    state.user.friends = friends;
  },
  SET_GROUPS: (state: State, groups: Array<string>) => {
    state.user.groups = groups;
  },
};

export const actions = {
  authStateChanged: async(ctx: any, { authUser }: any) => {
    if (authUser) {
      const { uid, email } = authUser;
      ctx.commit('SET_NEW_USER', { id: uid, email });

      const adminHeroesCollection = await Firebase.firestore().collection('heroes').get();
      const adminHeroes: Array<Hero> = adminHeroesCollection.docs.map((doc) => {
        const data = doc.data();
        return new Hero(doc.id, data.gameInfo, data.systemInfo);
      });

      const docRef = Firebase.firestore().collection('users').doc(uid);
      const doc = await docRef.get();
      if (doc.exists) {
        const docData = doc.data() || {};
        const filtersCollection = await Firebase.firestore().collection(`users/${uid}/filters`).get();
        const filters: Array<Filter> = filtersCollection.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, name: data.name, state: data.state };
        });

        ctx.commit('SET_ROLES', docData.roles || ['PLAYER']);
        ctx.commit('SET_SYSTEM_INFO', docData.systemInfo || new UserSystemInfo());
        ctx.commit('SET_SYSTEM_SETTINGS', docData.systemSettings || new UserSystemSettings());
        ctx.commit('SET_FRIENDS', docData.friends || []);
        ctx.commit('SET_GROUPS', docData.groups || []);
        ctx.commit('filter/SET_USER_FILTERS', filters || [], { root: true });
        ctx.commit('resource/SET_PLAYER_RESOURCES', { id: uid, resources: docData.resources || new Resources() }, { root: true });

        const loadedFriendList: Array<User> = [];
        for (const friend of docData.friends) {
          const friendDocRef = Firebase.firestore().collection('users').doc(friend);
          const friendDoc = await friendDocRef.get();
          if (friendDoc.exists) {
            const friendData = friendDoc.data() || {};
            const friendUser = new User();
            friendUser.id = friendDoc.id;
            friendUser.systemInfo = friendData.systemInfo || new UserSystemInfo();
            friendUser.resources = friendData.resources || new Resources();
            loadedFriendList.push(friendUser);
            ctx.commit('resource/SET_PLAYER_RESOURCES', { id: friendUser.id, resources: friendUser.resources }, { root: true });
          }
        }
        const loadedGroupList: Array<Group> = [];
        for (const group of docData.groups) {
          const groupDocRef = Firebase.firestore().collection('groups').doc(group);
          const groupDoc = await groupDocRef.get();
          if (groupDoc.exists) {
            const groupDocData = groupDoc.data() || {};
            const groupData = new Group(groupDocData.name, groupDocData.image);
            groupData.id = groupDoc.id;
            loadedGroupList.push(groupData);
          }
        }

        ctx.commit('friend/SET_LIST', loadedFriendList, { root: true });
        ctx.commit('group/SET_LIST', loadedGroupList, { root: true });
      } else {
        const roles = ['PLAYER'];
        const systemInfo = new UserSystemInfo();
        const systemSettings = new UserSystemSettings();
        const resources = new Resources();
        const friends: Array<string> = [];
        const groups: Array<string> = [];

        await docRef.set(JSON.parse(JSON.stringify({ roles, systemInfo, systemSettings, friends, groups, resources })));
        ctx.commit('SET_ROLES', roles);
        ctx.commit('SET_SYSTEM_INFO', systemInfo);
        ctx.commit('SET_SYSTEM_SETTINGS', systemSettings);
        ctx.commit('SET_FRIENDS', friends);
        ctx.commit('SET_GROUPS', groups);
        ctx.commit('resource/SET_PLAYER_RESOURCES', { id: uid, resources }, { root: true });
      }

      ctx.commit('hero/SET_BASE_HERO_LIST', convertFirebaseHeroList(adminHeroes), { root: true });
      ctx.commit('SET_IS_USER_LOADED', true);
    } else {
      ctx.commit('CLEAR_USER');
    }
  },
};
