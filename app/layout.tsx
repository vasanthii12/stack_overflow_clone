import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Q&A Website",
  description: "A responsive Q&A website similar to Stack Overflow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Q&A Website
              </Link>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-gray-900">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/ask" className="text-gray-600 hover:text-gray-900">
                      Ask Question
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-gray-500 text-sm">&copy; 2023 Q&A Website. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

