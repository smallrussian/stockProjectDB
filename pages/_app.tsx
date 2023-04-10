import '@/styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'

/* export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
} */

export default function App({
  Component,
  pageProps

}: AppProps<{initialSession: Session}>) {

  const [supabaseClient]=useState(()=>createBrowserSupabaseClient())
  return(
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}>
        <Component {...pageProps}/>
      </SessionContextProvider>
  )
}