'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Article } from '../../../typing';
import getUser from '../actions/getUser';
import ArticleCard from './components/ArticleCard';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SpinnerLoader from './components/SpinnerLoader';

const UserPage = () => {
  const session = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async (articleId: string) => {
    try {
      setIsLoading(true);
      await axios
        .delete(`/api/article?articleId=${articleId}`)
        .then((res) => console.log(res));

      setArticles(
        articles.filter(
          (existingArticles) => existingArticles._id !== articleId
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session.status == 'unauthenticated') {
      router.push('/auth-page');
    }

    const findUserArticles = async () => {
      setIsLoading(true);
      let userId;
      if (session.status == 'authenticated' && session.data.user?.email) {
        userId = await getUser(session.data?.user?.email);
        const fetchArticles = await fetch(`/api/get-articles?userId=${userId}`)
          .then((res) => res.json())
          .then((articles: Article[]) => setArticles(articles))
          .finally(() => setIsLoading(false));
      }
    };
    findUserArticles();
  }, [session, router]);

  const articlesToRender = (
    <>
      {articles &&
        !isLoading &&
        articles.length > 0 &&
        articles.map((article: Article) => (
          <ArticleCard
            key={article._id}
            onDelete={onDelete}
            article={article}
          />
        ))}
    </>
  );

  return (
    <div className="bg-zinc-100 min-h-screen">
      <h1 className="text-center text-xl md:text-3xl font-semibold mb-10">
        Ciao Benvenuto qui trovi tutti i tuoi articoli creati
      </h1>

      {isLoading && <SpinnerLoader />}

      <section className="grid px-2 gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto">
        {articlesToRender}
      </section>
      {!isLoading && articles.length == 0 && (
        <div className="text-center font-semibold text-2xl">
          Nessun articolo{' '}
          <Link className="underline text-emerald-600" href="/user/create">
            creane uno!
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPage;
