import Summon from '~/application/domain/summon/summon';

interface State {
  list: Array<Summon>;
}

export const state = (): State => ({
  list: [],
});

export const mutations = {
  SET_LIST: (state: State, list: Array<Summon>) => {
    state.list = list;
  },
  ADD_TO_LIST: (state: State, summon: Summon) => {
    state.list.push(summon);
  },
  REMOVE_FROM_LIST: (state: State, id: string) => {
    state.list = state.list.filter((elem: Summon) => elem.id !== id);
  },
};
