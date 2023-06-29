'use client';

import Link from 'next/link';
import { SiOpencollective } from 'react-icons/si';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className="p-2 md:px-5 bg-zinc-200 flex justify-between items-center">
      <div className="flex items-center ">
        <SiOpencollective
          className="w-6 h-6 mr-1 md:mr-4 cursor-pointer"
          onClick={() => router.push('/')}
        />
        <span className="font-semibold">App-next</span>
      </div>

      {session.status == 'authenticated' ? (
        <div className="flex gap-3">
          <button
            className=" custom-button bg-green-500"
            onClick={() => {
              router.push('/user/create');
            }}
          >
            Create
          </button>
          <button
            className="border-[2px] border-b-red-400"
            onClick={() => {
              console.log('signout clicked');
              signOut().then(() => router.push('/'));
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <Link
          href="/auth-page"
          className="custom-button bg-emerald-800 text-center"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Header;
