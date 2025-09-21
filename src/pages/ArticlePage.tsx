import type { FC } from 'react';
import { useParams } from 'react-router';
import Loader from '@/components/Loader';
import { useFetchNews } from '@/hooks/useFetchNews';

const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { news, isLoading } = useFetchNews();

  const article = news.find((article) => article.article_id === id);
  console.log(article);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <article className="bg-white dark:bg-gray-900">
          {article ? (
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                World news
              </h1>

              <div className="mt-8 lg:-mx-6 lg:flex">
                <img
                  className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
                  src={article.image_url}
                  alt={article.title || 'Article image'}
                  loading="lazy"
                />

                <div className="lg:w-1/2 lg:mt-0 lg:mx-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {article.title || 'Untitled'}
                  </h2>

                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    {article.pubDate || 'No date'}
                  </p>

                  <p className="mt-3 text-gray-700 dark:text-gray-300 md:text-md">
                    {article.content || 'No content available.'}
                  </p>

                  <div className="mt-8">
                    <p className="text-sm text-gray-700 dark:text-gray-200">{article.creator}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container px-6 py-10 mx-auto text-gray-700 dark:text-gray-200">
              Article not found
            </div>
          )}
        </article>
      )}
    </>
  );
};

export default ArticlePage;
