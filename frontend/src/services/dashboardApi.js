import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const dashboardApiHeaders = {    
    "Content-type": "application/json"
};

const createRequest = (url) => ({ url, headers: dashboardApiHeaders });

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blokbot-dashboard-test.herokuapp.com/' }),
  endpoints: (builder) => ({
    getDashboard: builder.query({
        query: () => createRequest(),
      }),
  }),
});

export const { useGetDashboardQuery} = dashboardApi;
