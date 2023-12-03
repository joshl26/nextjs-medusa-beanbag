import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>The page you tried to access does not exist.</p>
      <Link href="/">Go to frontpage</Link>
    </div>
  )
}
