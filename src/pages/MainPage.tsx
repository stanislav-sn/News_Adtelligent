import type { FC } from 'react';
import Loader from '@/components/Loader';
import { useFetchNews } from '@/hooks/useFetchNews';

const MainPage: FC = () => {
  const { news, isLoading } = useFetchNews();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            world news
          </h1>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {news.length ? (
              news.map((article) => (
                <div key={article.article_id}>
                  <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={article.image_url}
                    alt={article.title}
                  />

                  <div className="mt-8">
                    <span className="text-blue-500 uppercase">{article.category[0]}</span>

                    <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                      {article.title}
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <a
                          href={article.link || '#'}
                          className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                        >
                          {article.creator[0] || 'Unknown author'}
                        </a>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {article.pubDate || 'No date'}
                        </p>
                      </div>

                      <a
                        href={article.url || '#'}
                        className="inline-block text-blue-500 underline hover:text-blue-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No news found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainPage;
