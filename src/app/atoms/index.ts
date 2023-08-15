import { atom } from 'jotai';
import { LoginForm, LoadingState, UserSession } from '../types';

export const loginFormAtom = atom<LoginForm>({
  name: '',
  email: '',
  password: '',
});

export const loadingStateAtom = atom<LoadingState>({
  isLoading: false,
  error: '',
});

export const userSessionAtom = atom<UserSession | null>(null);
