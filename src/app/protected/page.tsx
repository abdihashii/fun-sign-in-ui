'use client';

import Link from 'next/link';
import useAuth from '../hooks/useAuth';

export default function ProtectedPage() {
  const { userSession } = useAuth();

  return (
    <div>
      {userSession?.session ? (
        <h1>Protected Page</h1>
      ) : (
        <>
          <h1>You are not signed in!</h1>
          <Link href="/sign-in">Sign In</Link>
        </>
      )}
    </div>
  );
}
