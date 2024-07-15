import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getMarketData: builder.query<any, any>({
      query: () => "/global",
    }),
    getSearchData: builder.query({
      query: (currency) => `/coins/markets/?vs_currency=${currency}`,
    }),
    getChartCoinData: builder.query({
      query: (query) => `coins/${query}`,
    }),
    getCoinTableList: builder.query({
      query: ({ currency, page, limit }) =>
        `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
    }),
    getSearchQueryData: builder.query({
      query: (searchQuery) => `search?query=${searchQuery}`,
    }),
  }),
});
export const {
  useGetMarketDataQuery,
  useGetSearchDataQuery,
  useGetChartCoinDataQuery,
  useGetCoinTableListQuery,
  useGetSearchQueryDataQuery,
} = api;
