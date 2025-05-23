
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UsersProvider } from './context/usersContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./mock/browser');
  await worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    },
    mutations: {
      retry: 2,
      retryDelay: (attempt) => 1000 * attempt
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <App />
      </UsersProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
