'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import supabase from '../utils/supabaseClient';

export default function ProtectedPage() {
  const { userSession, setUserSession, handleSignOut } = useAuth();
  const router = useRouter();

  async function getUserSession() {
    const { data, error } = await supabase.auth.getSession();
    const newSession = data?.session ?? null;
    const newUser = newSession?.user ?? null;

    if (error || !newUser || !newSession) {
      console.error(error || 'No user or session found');
      router.push('/sign-in');
    }

    const newUserSession = {
      user: newUser,
      session: newSession,
    };

    setUserSession(newUserSession);
  }

  // When users visit this page, if they are not signed in, they will be redirected to the sign in page
  useEffect(() => {
    if (!userSession) {
      getUserSession();
    }
  }, [userSession, router]);

  return (
    <div>
      <h1>This is a PROTECTED Page</h1>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignOut}
      >
        Sign out
      </button>

      <pre>
        <code>{JSON.stringify(userSession, null, 2)}</code>
      </pre>
    </div>
  );
}
