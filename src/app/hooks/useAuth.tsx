'use client';

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { loginFormAtom, loadingStateAtom, userSessionAtom } from '../atoms';
import supabase from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { UserSession } from '../types';

const useAuth = () => {
  const [loginForm, setLoginForm] = useAtom(loginFormAtom);
  const router = useRouter();
  const [loadingState, setLoadingState] = useAtom(loadingStateAtom);
  const [userSession, setUserSession] = useAtom(userSessionAtom);

  const handleSignUp = (e: Event) => {
    e.preventDefault();
  };

  const handleSignIn = async () => {
    setLoadingState({
      ...loadingState,
      isLoading: true,
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (error) {
      console.error(error);
      setLoadingState({
        isLoading: false,
        error: error.message,
      });

      return;
    }

    console.log(data);

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

  useEffect(() => {
    async function getUserSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.error(error);
        return;
      }

      const newUserSession = {
        ...userSession,
        session,
      };

      setUserSession(newUserSession as UserSession);
    }

    if (userSession === null) return;

    getUserSession();
  }, [userSession, setUserSession]);

  return {
    userSession,
    loadingState,
    loginForm,
    handleSignIn,
    handleSignUp,
    handleInputChange,
  };
};

export default useAuth;
