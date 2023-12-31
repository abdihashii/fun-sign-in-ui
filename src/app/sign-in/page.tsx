'use client';

import Link from 'next/link';
import GoogleColorIcon from '../icons/googleColorIcon';
import AppleBlackIcon from '../icons/appleBlackIcon';
import LoadingSpinner from '../icons/loadingSpinner';
import useAuth from '../hooks/useAuth';

export default function SignUpPage() {
  const {
    userSession,
    loadingState,
    loginForm,
    handleInputChange,
    handleFormSubmit,
  } = useAuth();

  return (
    <main className="w-96 mx-auto mt-20 flex flex-col justify-center gap-16">
      <h1 className="text-center text-5xl text-black font-medium">
        Welcome back!
      </h1>

      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit('sign-in');
        }}
      >
        <input
          className="h-14 py-3 px-5 rounded-xl border border-gray-500"
          type="email"
          placeholder="Email"
          name="email"
          value={loginForm?.email}
          onChange={handleInputChange}
          required
        />

        <div className="flex flex-col gap-4">
          <input
            className="h-14 py-3 px-5 rounded-xl border border-gray-500"
            type="password"
            placeholder="Password"
            name="password"
            value={loginForm?.password}
            onChange={handleInputChange}
            required
          />
          <p className="text-right underline font-medium text-sm">
            Forgot password?
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="h-14 border border-black p-3 font-medium rounded-xl bg-black text-white text-base"
            type="submit"
          >
            {loadingState.isLoading ? <LoadingSpinner /> : `Sign in`}
          </button>

          {loadingState.error && (
            <p className="text-red-500 font-medium text-sm">
              Failed to sign in: {loadingState.error}. Please try again.
            </p>
          )}

          <p className="text-gray-500 font-medium text-sm">
            Don&apos;t have an account? {` `}
            <Link
              className="hover:text-gray-500 underline text-black"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>

      <div className="flex flex-col gap-6">
        <button className="h-14 p-3 gap-2 justify-center items-center flex flex-row py-3 bg-black text-white rounded-xl text-base border border-black">
          <AppleBlackIcon />
          Sign in with Apple
        </button>
        <button className="hover:border-2 h-14 p-3 gap-2 justify-center items-center flex flex-row border border-gray-500 py-3 bg-white text-black rounded-xl text-base">
          <GoogleColorIcon />
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
