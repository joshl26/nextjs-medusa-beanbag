import { Button, Heading, Text } from "@medusajs/ui"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div >
      <div>
        <Heading level="h2" >
          Already have an account?
        </Heading>
        <Text >
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <Link href="/account/login">
          <Button variant="secondary" >
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
