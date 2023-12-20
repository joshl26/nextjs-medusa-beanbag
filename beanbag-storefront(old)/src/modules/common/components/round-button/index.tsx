import React from "react"
import styles from "./round-button.module.css"
import Link from "next/link"

type RoundButtonProps = {
  href: string | ""
  buttonText: string
  className: string | null
}

const RoundButton = ({ href, buttonText, className }: RoundButtonProps) => {
  return (
    <button className={`${styles.button_style} ${className}`}>
      <Link href={href}>{buttonText}</Link>
    </button>
  )
}

export default RoundButton
