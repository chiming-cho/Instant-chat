import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'instant-chat',
  description: 'Simple web messenger with 4-digit room code',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}