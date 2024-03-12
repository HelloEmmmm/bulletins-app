"use client"

import {Inter} from "next/font/google";
import "./globals.css";
import {useAuth} from "@/app/hooks/useAuth";
import React from "react";
import {useRouter} from "next/navigation";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()

    React.useEffect(() => {
        router.push('/login')

        window?.ipc?.on('message', (message: string) => {
            console.log(message, 999)
        })
    }, [router])

    useAuth();
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
