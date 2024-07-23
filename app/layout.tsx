import '@/styles/globals.css'
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata = {
  title: 'Next.js',
  description: 'AWS S3 Upload Example',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
      )}>{children}</body>
    </html>
  )
}






// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//       <html lang="en" suppressHydrationWarning>
//       <head />
//       <body
//           className={cn(
//               "min-h-screen bg-background font-sans antialiased",
//               fontSans.variable
//           )}
//       >
//       ...
//       </body>
//       </html>
//   )
// }

