import User from '~/application/domain/user/user';

interface CompareFriendUpdate {
  index: number;
  friend: User;
}

interface State {
  onCompare: boolean;
  friends: Array<User>
}

export const state = (): State => ({
  onCompare: false,
  friends: [new User(), new User()],
});

export const mutations = {
  RESET: (state: State) => {
    state.onCompare = false;
    state.friends = [new User(), new User()];
  },
  SET_ON_COMPARE: (state: State, onCompare: boolean) => {
    state.onCompare = onCompare;
  },
  SET_FRIEND: (state: State, { index, friend }: CompareFriendUpdate) => {
    state.friends[index].id = friend.id;
    state.friends[index].systemInfo = friend.systemInfo;
    state.friends[index].resources = friend.resources;
  },
};
