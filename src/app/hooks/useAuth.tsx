'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { loginFormAtom, loadingStateAtom, userSessionAtom } from '../atoms';
import supabase from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [loginForm, setLoginForm] = useAtom(loginFormAtom);
  const router = useRouter();
  const [loadingState, setLoadingState] = useAtom(loadingStateAtom);
  const [userSession, setUserSession] = useAtom(userSessionAtom);

  const handleFormSubmit = async (type: string) => {
    setLoadingState({
      ...loadingState,
      isLoading: true,
    });

    let data,
      error = null;

    if (type === 'sign-up') {
      const response = await supabase.auth.signUp({
        email: loginForm.email,
        password: loginForm.password,
      });

      data = response.data;
      error = response.error;
    } else if (type === 'sign-in') {
      const response = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      data = response.data;
      error = response.error;
    } else {
      console.error('Invalid form type');
      return;
    }

    if (error) {
      console.error(error);
      setLoadingState({
        isLoading: false,
        error: error.message,
      });

      return;
    }

    setUserSession(data);

    setLoginForm({
      email: '',
      password: '',
    });

    setLoadingState({
      isLoading: false,
      error: '',
    });

    router.push('/protected');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newLoginForm = { ...loginForm, [name]: value };

    setLoginForm(newLoginForm);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    setUserSession(null);
    router.push('/sign-in');
  };

  return {
    userSession,
    setUserSession,
    loadingState,
    loginForm,
    handleFormSubmit,
    handleInputChange,
    handleSignOut,
  };
};

export default useAuth;
