'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import Input from '../components/Input';
import { signIn, useSession } from 'next-auth/react';
import { SiOpencollective } from 'react-icons/si';

type Variant = 'LOGIN' | 'REGISTER';

const AuthPage = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // A function that change the Variant value
  const toggleVariant = useCallback(() => {
    if (variant == 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  // React-hook-form to handle the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant == 'REGISTER') {
      // This function regist the new User and then logged it into signIn a function from next-auth/react
      axios
        .post('/api/user', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false));
    }

    if (variant == 'LOGIN') {
      // this function simply try to log in the user and if there is any problem show an error otherwise change route to /users (that si protected by a middleware)
      // watch @/app/api/auth/[...nextauth]/route.ts to see the backend logic
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            console.log(callback?.error);
            toast.error('Invalid credentials');
          }

          if (callback?.ok && !callback?.error) {
            toast.success('Logged in');
            router.push('/user');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (session?.status == 'authenticated') {
      router.push('/user');
      console.log('Authanticated');
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen flex-col justify-center gap-3 py-10 sm:px-6 lg:px-4 bg-gray-100">
      <SiOpencollective className=" w-28 h-28 mx-auto" />

      <div className="mt-5 px-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow rounded-lg sm:px-10">
          {/* handleSubmit from React-hook-form wrap onSubmit and sand the -data- (look the onSubmit function) */}
          <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Optional rendering */}
            {variant == 'REGISTER' && (
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              id="email"
              label="Email address"
              type="email"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <div>
              <Button disabled={isLoading} fullWidth type="submit">
                {variant == 'LOGIN' ? 'Login' : 'Register'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant == 'LOGIN' ? 'New user?' : 'Already have an account?'}
            </div>

            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant == 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
