"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import {useAuth} from "@/app/hooks/useAuth";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuth();
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
