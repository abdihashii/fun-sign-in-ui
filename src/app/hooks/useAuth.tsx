'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { loginFormAtom } from '../atoms';
import supabase from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [loginForm, setLoginForm] = useAtom(loginFormAtom);
  const router = useRouter();

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

    router.push('/protected');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newLoginForm = { ...loginForm, [name]: value };

    setLoginForm(newLoginForm);
  };

  return { loginForm, handleSignIn, handleSignUp, handleInputChange };
};

export default useAuth;
