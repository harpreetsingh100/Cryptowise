import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = `x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

export const cryptoApp = createApi({
  reducerPath: "cryptoApp",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
  }),

  endpoints: (builder) => ({
    getMarketData: builder.query<any, void>({
      query: () => "/global",
    }),
    getSearchData: builder.query({
      query: (currency) => `/coins/markets/?vs_currency=${currency}&${apiKey}`,
    }),
    getChartCoinData: builder.query({
      query: (query) => `coins/${query}&${apiKey}`,
    }),
    getCoinTableList: builder.query({
      query: ({ currency, page, limit }) =>
        `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&${apiKey}`,
    }),
    getSearchQueryData: builder.query({
      query: (searchQuery) => `search?query=${searchQuery}&${apiKey}`,
    }),
    getCoinData: builder.query({
      query: ({ currencyType, coinName }) =>
        `/coins/markets?vs_currency=${currencyType}&ids=${coinName}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&${apiKey}`,
    }),
    getHistoryDateCoinDetail: builder.query({
      query: ({ id, date }) => `/coins/${id}/history?date=${date}&${apiKey}`,
    }),
    getOneCoinDetail: builder.query({
      query: (query) =>
        `coins/${query}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false&${apiKey}`,
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
