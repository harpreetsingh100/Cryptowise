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
  }),
});
export const {
  useGetMarketDataQuery,
  useGetSearchDataQuery,
  useGetChartCoinDataQuery,
} = api;
