import * as UserActions from '../actions/user.actions';
import { initialState, reducer } from './user.reducer';

describe('User Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const result = reducer(initialState, action);
    expect(result).toBe(initialState);
  });

  describe(UserActions.SignUp.name, () => {
    it('reduces', () => {
      const action = new UserActions.SignUp({
        email: 'something@example.com',
        password: 'password123',
      });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        signUpLoading: true,
        email: 'something@example.com',
      });
    });
  });

  describe(UserActions.SignUpSuccess.name, () => {
    it('reduces', () => {
      const action = new UserActions.SignUpSuccess({} as any);
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        signUpLoading: false,
      });
    });
  });

  describe(UserActions.UserError.name, () => {
    it('reduces', () => {
      const action = new UserActions.UserError(new Error('Sign up failed'));
      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });
});
