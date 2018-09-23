import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface State {
  signUpLoading: boolean;
  verifyLoading: boolean;
  loginLoading: boolean;
  email?: string;
  userSession?: CognitoUserSession;
}

export const initialState: State = {
  signUpLoading: false,
  verifyLoading: false,
  loginLoading: false,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.Login:
      return { ...state, loginLoading: true };

    case UserActionTypes.LoginSuccess:
      return { ...state, loginLoading: false, userSession: action.payload };

    case UserActionTypes.SignUp:
      return { ...state, email: action.payload.email, signUpLoading: true };

    case UserActionTypes.SignUpSuccess:
      return { ...state, signUpLoading: false };

    case UserActionTypes.Verify:
      return { ...state, verifyLoading: true };

    case UserActionTypes.VerifySuccess:
      return { ...state, verifyLoading: false };

    case UserActionTypes.UserError:
      return {
        ...state,
        loginLoading: false,
        verifyLoading: false,
        signUpLoading: false,
      };

    default:
      return state;
  }
}

export const featureSelector = createFeatureSelector<State>('user');
export const getSignUpLoading = createSelector(
  featureSelector,
  state => state.signUpLoading
);
export const getVerifyLoading = createSelector(
  featureSelector,
  state => state.verifyLoading
);
export const getLoginLoading = createSelector(
  featureSelector,
  state => state.loginLoading
);
export const getEmail = createSelector(featureSelector, state => state.email);
