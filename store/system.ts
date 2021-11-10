interface PageState {
  title: string;
  heroFilterEnabled: boolean;
}

interface State {
  pageState: PageState;
}

export const state = (): State => ({
  pageState: {
    title: '',
    heroFilterEnabled: false,
  },
});

export const mutations = {
  SET_PAGE_STATE: (state: State, pageState: PageState) => {
    state.pageState = pageState;
  },
};
