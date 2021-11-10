interface PageAction {
  icon: string;
  callback: any; // function
}

interface PageState {
  title: string;
  heroFilterEnabled?: boolean;
  compareEnabled?: boolean;
  extraActions?: Array<PageAction>;
}

interface State {
  pageState: PageState;
}

const defaultPageState = {
  title: '',
  heroFilterEnabled: false,
  compareEnabled: false,
  extraActions: [],
};

export const state = (): State => ({
  pageState: defaultPageState,
});

export const mutations = {
  RESET_PAGE_STATE: (state: State) => {
    state.pageState = defaultPageState;
  },
  SET_PAGE_STATE: (state: State, pageState: PageState) => {
    state.pageState = pageState;
  },
};
