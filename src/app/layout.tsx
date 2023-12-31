import { Session } from 'next-auth';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToastContext';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next App Wezard',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <ToasterContext />
        <AuthContext session={session}>{children}</AuthContext>
      </body>
    </html>
  );
}
