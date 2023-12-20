import Link from "next/link"
import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <Link href={href} onClick={onClick} {...props}>
      <Text>{children}</Text>
      <ArrowUpRightMini color="var(--fg-interactive)" />
    </Link>
  )
}

export default InteractiveLink
