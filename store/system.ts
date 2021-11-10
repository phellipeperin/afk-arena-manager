interface PageAction {
  icon: string;
  callback: any; // function
}

interface PageState {
  title: string;
  heroFilterEnabled: boolean;
  compareEnabled: boolean;
  extraActions: Array<PageAction>;
}

interface State {
  pageState: PageState;
}

export const state = (): State => ({
  pageState: {
    title: '',
    heroFilterEnabled: false,
    compareEnabled: false,
    extraActions: [],
  },
});

export const mutations = {
  SET_PAGE_STATE: (state: State, pageState: PageState) => {
    state.pageState = pageState;
  },
};
