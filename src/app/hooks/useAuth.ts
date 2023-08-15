'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { loginFormAtom } from '../atoms/';

const useAuth = () => {
  const [loginForm, setLoginForm] = useAtom(loginFormAtom);

  const handleLogin = (e: Event) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newLoginForm = { ...loginForm, [name]: value };

    setLoginForm(newLoginForm);
  };

  return { loginForm, handleLogin, handleInputChange };
};

export default useAuth;
