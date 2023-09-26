import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ArticleData, Author, FetchedArticlesData } from '../../types';

const URL = 'https://api.realworld.io/api';

const articlesApi = createApi({
  reducerPath: 'articles',
  tagTypes: ['Article'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints(builder) {
    return {
      fetchArticles: builder.query<FetchedArticlesData, void>({
        query: () => {
          return {
            url: '/articles?limit=50',
            method: 'GET',
          };
        },
      }),

      fetchArticlesBySlug: builder.query<{ article: ArticleData }, string>({
        query: (slug: string) => {
          return {
            url: `/articles/${slug}`,
            method: 'GET',
          };
        },
      }),
      fetchArticlesByTag: builder.query<FetchedArticlesData, string>({
        query: (tag: string) => {
          return {
            url: `/articles?tag=${tag.toLowerCase()}`,
            method: 'GET',
          };
        },
      }),

      fetchProfileArticles: builder.query<
        FetchedArticlesData,
        Author['username']
      >({
        query: (author: Author['username']) => {
          return {
            url: `/articles?author=${author}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchArticlesQuery,
  useFetchProfileArticlesQuery,
  useFetchArticlesByTagQuery,
  useFetchArticlesBySlugQuery,
} = articlesApi;
export { articlesApi };
