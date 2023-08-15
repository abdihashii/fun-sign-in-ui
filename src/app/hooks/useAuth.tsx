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

  const handleSignUp = async () => {
    setLoadingState({
      ...loadingState,
      isLoading: true,
    });

    const { data, error } = await supabase.auth.signUp({
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

    setUserSession(data);

    setLoginForm({
      email: '',
      password: '',
    });

    setLoadingState({
      isLoading: false,
      error: '',
    });
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

  // Check for an active session when the app mounts
  useEffect(() => {
    async function getUserSession() {
      const { data, error } = await supabase.auth.getSession();
      const newSession = data?.session ?? null;
      const newUser = newSession?.user ?? null;

      if (error) {
        console.error(error);
        return;
      }

      const newUserSession = {
        user: newUser,
        session: newSession,
      };

      setUserSession(newUserSession);
    }

    getUserSession();
  }, []);

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
