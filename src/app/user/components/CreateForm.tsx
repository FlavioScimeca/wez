'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import getUser from '@/app/actions/getUser';
import { useRouter } from 'next/navigation';

const CreateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      location: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const findUserId = async () => {
      let userId;
      if (session.status == 'authenticated' && session.data.user?.email) {
        userId = await getUser(session.data?.user?.email);
      }
      return userId;
    };

    try {
      const userId = await findUserId();

      const dataToSend = {
        ...data,
        ownerId: userId,
      };

      axios
        .post('/api/article', dataToSend)
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
          router.push('/user');
        });
    } catch (error) {
      throw Error('ERROR while submitting formdata' + error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-semibold">Crea un articolo</h1>
      <form
        className="mt-5 px-5 sm:mx-auto sm:w-full sm:max-w-lg p-2 bg-white rounded-lg shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          key="title"
          id="title"
          label="Title"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          key="description"
          id="description"
          label="Description"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <Input
          key="price"
          id="price"
          label="Price"
          register={register}
          errors={errors}
          disabled={isLoading}
          type="number"
          required
        />
        <Input
          key="location"
          id="location"
          label="Location"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />

        <Button type="submit" fullWidth disabled={isLoading}>
          Crea
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
