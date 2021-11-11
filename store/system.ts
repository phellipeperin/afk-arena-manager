interface PageAction {
  icon: string;
  callback: any; // function
}

interface PageState {
  title: string;
  heroFilterEnabled?: boolean;
  compareEnabled?: boolean;
  tabs?: Array<string>;
  selectedTab?: number;
  extraActions?: Array<PageAction>;
}

interface State {
  pageState: PageState;
}

const defaultPageState = {
  title: '',
  heroFilterEnabled: false,
  compareEnabled: false,
  tabs: [],
  selectedTab: 0,
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
    state.pageState = { ...state.pageState, ...pageState };
  },
  SET_PAGE_STATE_SELECTED_TAB: (state: State, tab: number) => {
    state.pageState.selectedTab = tab;
  },
};
