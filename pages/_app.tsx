import { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import React from 'react'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
