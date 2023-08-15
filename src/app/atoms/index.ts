import { atom } from 'jotai';
import { LoginForm } from '../types';

export const loginFormAtom = atom<LoginForm>({
  name: '',
  email: '',
  password: '',
});
