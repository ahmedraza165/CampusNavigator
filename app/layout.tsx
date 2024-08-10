import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "@/components/AuthProvider";
import 'react-tooltip/dist/react-tooltip.css'
import StoreProvider from "@/components/StoreProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: {
      template: '%s - Campus Navigator',
      default: 'Campus Navigator',
    },
    description:
      'Campus Navigator',
  }
export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ToastContainer/>
        <AuthProvider>
            <StoreProvider>
                {children}
            </StoreProvider>
        </AuthProvider>
        </body>
        </html>
    )
}
