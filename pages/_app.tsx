import '@/styles/globals.css'
import '@/styles/fix.css'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { MyUserContextProvider } from '../utils/useUser'
import { NextPage } from 'next'
import React, { ReactElement, ReactNode, useState, useEffect } from 'react'
import type { Database } from '../types/supabase'


export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
  useEffect(() => {
    document.body.classList?.remove('loading')
    }, [])
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <MyUserContextProvider>
        <Component {...pageProps} />
      </MyUserContextProvider>
    </SessionContextProvider>
  )
}


