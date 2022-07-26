interface PageAction {
  icon: string;
  callback: any; // function
}

interface PageState {
  title: string;
  canGoBack?: boolean;
  heroFilterEnabled?: boolean;
  heroSearchEnabled?: boolean;
  compareEnabled?: boolean;
  helpInfoEnabled?: boolean;

  tabs?: Array<string>;
  extraActions?: Array<PageAction>;

  selectedTab?: number;
  helpDialogOpen?: boolean;
}

interface State {
  pageState: PageState;
}

const defaultPageState = {
  title: '',
  canGoBack: false,
  heroFilterEnabled: false,
  heroSearchEnabled: false,
  compareEnabled: false,
  helpInfoEnabled: false,
  tabs: [],
  extraActions: [],
  selectedTab: 0,
  helpDialogOpen: false,
};

export const state = (): State => ({
  pageState: defaultPageState,
});

export const mutations = {
  RESET: (state: State) => {
    state.pageState = defaultPageState;
  },
  SET_PAGE_STATE: (state: State, pageState: PageState) => {
    state.pageState = { ...state.pageState, ...pageState };
  },
  SET_PAGE_STATE_SELECTED_TAB: (state: State, tab: number) => {
    state.pageState.selectedTab = tab;
  },
  SET_PAGE_STATE_HELP_DIALOG_OPEN: (state: State, open: boolean) => {
    state.pageState.helpDialogOpen = open;
  },
};
