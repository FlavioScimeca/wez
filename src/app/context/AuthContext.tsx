'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';

interface AuthContextProps {
  children: React.ReactNode;
  session: Session;
}

export default function AuthContext({ children, session }: AuthContextProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      {children}
    </SessionProvider>
  );
}
