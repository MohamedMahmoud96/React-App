
import ReactDOM from 'react-dom/client';
import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AdoptedPetContext from './contexts/AdoptedPetContext';
import Loader from './components/Loading';
import { Pet } from './types/common';
import React from 'react';


const Details = lazy(() => import('./pages/Details'));
const SearchParams = lazy(() => import('./pages/SearchParams'));

const NotFound = () => <h1>Page Not Found</h1>;

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime:Infinity,
            cacheTime:Infinity
        }
    }

});
//import Details from './components/Details';
//import Link  from 'react-router-dom';

// App Component
const App = () => {
  const adoptedPet= useState<Pet | null>(null);
  return (

      <BrowserRouter>
      <AdoptedPetContext.Provider value={adoptedPet}>
      <QueryClientProvider client={queryClient}>
      <Suspense
            fallback={
              <div className="loader-container">
                <Loader />
              </div>
            }
          >
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
         <Routes>
         <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams  />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
      </QueryClientProvider>
      
      </AdoptedPetContext.Provider>
    </BrowserRouter>

  );
};
// Get Root Element
const container = document.getElementById('root');
// Create a root.
const root = ReactDOM.createRoot(container as HTMLDivElement);
// Initial render
root.render(<App />);
