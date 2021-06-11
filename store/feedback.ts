type messageType = 'success' | 'info' | 'warning' | 'error';

interface State {
  message: string;
  type: messageType;
  show: boolean;
}

export const state = (): State => ({
  message: 'message',
  type: 'info',
  show: false,
});

const setMessage = (state: State, message: string, type: messageType): void => {
  state.message = message;
  state.type = type;
  state.show = true;
};

export const mutations = {
  SHOW_SUCCESS_MESSAGE: (state: State, message: string) => {
    setMessage(state, message, 'success');
  },
  SHOW_INFO_MESSAGE: (state: State, message: string) => {
    setMessage(state, message, 'info');
  },
  SHOW_WARNING_MESSAGE: (state: State, message: string) => {
    setMessage(state, message, 'warning');
  },
  SHOW_ERROR_MESSAGE: (state: State, message: string) => {
    setMessage(state, message, 'error');
  },
  HIDE_MESSAGE: (state: State) => {
    state.show = false;
  },
};
