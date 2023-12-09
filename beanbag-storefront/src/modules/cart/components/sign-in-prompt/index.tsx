import RoundButton from "@modules/common/components/round-button"
import Link from "next/link"
import styles from "./sign-in-prompt.module.css"

const SignInPrompt = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ width: "75%", display: "flex", flexDirection: "column" }}>
        <h2>Already have an account?</h2>
        <p>Sign in for a better experience.</p>
      </div>
      <div style={{ width: "25%", display: "flex" }}>
        <Link href="/account/login">
          <RoundButton
            className={styles.button_style}
            href="/account/login"
            buttonText="Sign in"
          />
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
