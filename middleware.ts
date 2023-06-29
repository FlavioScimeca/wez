import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth-page',
  },
});

export const config = {
  matcher: ['/user/:path*'],
};
