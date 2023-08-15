'use client';

import Link from 'next/link';
import GoogleColorIcon from '../icons/googleColorIcon';
import AppleBlackIcon from '../icons/appleBlackIcon';
import useAuth from '../hooks/useAuth';

export default function SignUpPage() {
  const { loginForm, handleInputChange, handleSignUp, userSession } = useAuth();

  return (
    <main className="w-96 mx-auto mt-20 flex flex-col justify-center gap-16">
      <h1 className="text-center text-5xl text-black font-medium">
        Create Account
      </h1>

      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleSignUp();
        }}
      >
        <div className="flex flex-col gap-4">
          <p className="font-medium text-black text-sm">
            Let&apos;s get started with your 30 days trial
          </p>
          <input
            className="h-14 py-3 px-5 rounded-xl border border-gray-500"
            type="text"
            placeholder="Name"
            name="name"
            value={loginForm?.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <input
          className="h-14 py-3 px-5 rounded-xl border border-gray-500"
          type="email"
          placeholder="Email"
          name="email"
          value={loginForm?.email}
          onChange={handleInputChange}
          required
        />
        <input
          className="h-14 py-3 px-5 rounded-xl border border-gray-500"
          type="password"
          placeholder="Password"
          name="password"
          value={loginForm?.password}
          onChange={handleInputChange}
          required
        />

        <div className="flex flex-col gap-4">
          <button
            className="h-14 border border-black p-3 font-medium rounded-xl bg-black text-white text-base"
            type="submit"
          >
            Create account
          </button>

          <p className="text-gray-500 font-medium text-sm">
            Already have an account? {` `}
            <Link
              className="hover:text-gray-500 text-black underline"
              href="/sign-in"
            >
              Login
            </Link>
          </p>
        </div>
      </form>

      <div className="flex flex-col gap-6">
        <button className="h-14 p-3 gap-2 justify-center items-center flex flex-row py-3 bg-black text-white rounded-xl text-base border border-black">
          <AppleBlackIcon />
          Sign up with Apple
        </button>
        <button className="hover:border-2 h-14 p-3 gap-2 justify-center items-center flex flex-row border border-gray-500 py-3 bg-white text-black rounded-xl text-base">
          <GoogleColorIcon />
          Sign up with Google
        </button>
      </div>

      <pre>
        <code>{JSON.stringify(userSession, null, 2)}</code>
      </pre>
    </main>
  );
}
