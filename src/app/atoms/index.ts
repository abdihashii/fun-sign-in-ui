import { atom } from 'jotai';
import { LoginForm, LoadingState } from '../types';

export const loginFormAtom = atom<LoginForm>({
  name: '',
  email: '',
  password: '',
});

export const loadingStateAtom = atom<LoadingState>({
  isLoading: false,
  error: '',
});
