'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { loginFormAtom } from '../atoms';
import supabase from '../utils/supabaseClient';

const useAuth = () => {
  const [loginForm, setLoginForm] = useAtom(loginFormAtom);

  const handleSignUp = (e: Event) => {
    e.preventDefault();
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);

    setLoginForm({
      email: '',
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newLoginForm = { ...loginForm, [name]: value };

    setLoginForm(newLoginForm);
  };

  return { loginForm, handleSignIn, handleSignUp, handleInputChange };
};

export default useAuth;
