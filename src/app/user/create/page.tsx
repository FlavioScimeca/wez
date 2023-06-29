'use client';

import { useSession } from 'next-auth/react';
import CreateForm from '../components/CreateForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CreatePage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status == 'unauthenticated') {
      router.push('/auth-page');
    }
  }, [session, router]);
  return (
    <>
      <CreateForm />
    </>
  );
};

export default CreatePage;
