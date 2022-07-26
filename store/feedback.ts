type messageType = 'success' | 'info' | 'warning' | 'error';

interface ToastMessage {
  message: string;
  type: messageType;
  show: boolean;
}

interface ConfirmationMessage {
  title: string;
  message: string;
  show: boolean;
  callback: any;
}

interface State {
  toast: ToastMessage;
  confirmation: ConfirmationMessage;
}

export const state = (): State => ({
  toast: {
    message: 'message',
    type: 'info',
    show: false,
  },
  confirmation: {
    title: '',
    message: 'message',
    show: false,
    callback: () => {},
  },
});

const setToastMessage = (state: State, message: string, type: messageType): void => {
  state.toast.message = message;
  state.toast.type = type;
  state.toast.show = true;
};

export const mutations = {
  SHOW_SUCCESS_MESSAGE: (state: State, message: string) => {
    setToastMessage(state, message, 'success');
  },
  SHOW_INFO_MESSAGE: (state: State, message: string) => {
    setToastMessage(state, message, 'info');
  },
  SHOW_WARNING_MESSAGE: (state: State, message: string) => {
    setToastMessage(state, message, 'warning');
  },
  SHOW_ERROR_MESSAGE: (state: State, message: string) => {
    setToastMessage(state, message, 'error');
  },
  HIDE_TOAST_MESSAGE: (state: State) => {
    state.toast.show = false;
  },
  ASK_FOR_CONFIRMATION: (state: State, { title, message, callback }: ConfirmationMessage) => {
    state.confirmation.title = title;
    state.confirmation.message = message;
    state.confirmation.callback = callback;
    state.confirmation.show = true;
  },
  HIDE_CONFIRMATION_MESSAGE: (state: State) => {
    state.confirmation.callback = () => {};
    state.confirmation.show = false;
  },
};
