import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

export const cryptoApp = createApi({
  reducerPath: "cryptoApp",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
    mode: "cors",
    prepareHeaders: (headers) => {
      headers.set("x-cg-demo-api-key", apiKey);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getMarketData: builder.query<any, void>({
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
    getCoinData: builder.query({
      query: ({ currencyType, coinName }) =>
        `/coins/markets?vs_currency=${currencyType}&ids=${coinName}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
    }),
    getHistoryDateCoinDetail: builder.query({
      query: ({ id, date }) => `/coins/${id}/history?date=${date}`,
    }),
    getOneCoinDetail: builder.query({
      query: (query) =>
        `coins/${query}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`,
    }),
  }),
});

export const {
  useGetMarketDataQuery,
  useGetSearchDataQuery,
  useGetChartCoinDataQuery,
  useGetCoinTableListQuery,
  useGetSearchQueryDataQuery,
  useGetCoinDataQuery,
  useGetHistoryDateCoinDetailQuery,
  useGetOneCoinDetailQuery,
} = cryptoApp;
