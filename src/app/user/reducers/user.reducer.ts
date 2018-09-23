import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface State {
  signUpLoading: boolean;
}

export const initialState: State = {
  signUpLoading: false,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.SignUp:
      return { ...state, signUpLoading: true };

    case UserActionTypes.SignUpSuccess:
    case UserActionTypes.SignUpError:
      return { ...state, signUpLoading: false };

    default:
      return state;
  }
}
