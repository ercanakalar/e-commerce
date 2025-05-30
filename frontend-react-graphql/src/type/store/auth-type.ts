export type IAuthUserState = 'initial' | 'auth';
export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
}
export interface IAuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  state: IAuthUserState;
  token: string | null;
  user: IUser | null;
  errors: any;
}
