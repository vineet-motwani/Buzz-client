import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 

const inter = Inter({ subsets: ["latin", "cyrillic", "greek"] }); 

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
    <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="620286183170-d4v9v4ir1kdds42ei1lmctdf5he7659b.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster />  
      <ReactQueryDevtools/>
    </GoogleOAuthProvider>
    </QueryClientProvider>
  </div>;
}

