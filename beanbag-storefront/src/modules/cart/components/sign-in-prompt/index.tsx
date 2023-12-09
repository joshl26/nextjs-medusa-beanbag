import Link from "next/link"

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
      <div style={{ width: "80%" }}>
        <h2>Already have an account?</h2>
        <p>Sign in for a better experience.</p>
      </div>
      <div style={{ width: "20%" }}>
        <Link href="/account/login">
          <button>Sign in</button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
