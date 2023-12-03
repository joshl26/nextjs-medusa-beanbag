import Providers from "@modules/providers"
import type { Metadata } from "next"
import { Inter, Raleway } from "next/font/google"
import "styles/globals.css"
import styles from "../styles/page.module.css"

const raleway = Raleway({ subsets: ["latin"], weight: ["100", "400"] })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beanbag Coffee Co.",
  description: "Curating authentic roasts from around the world",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mode="light">
      <body className={`${inter.className} ${raleway.className} antialiased`}>
        <Providers>
          <div className="root-container">
            <main className={styles.main}>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
