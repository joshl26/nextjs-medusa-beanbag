import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import { Button } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import { Spinner } from "@medusajs/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("An error occured. Please try again.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div >
      {isSubmitting && (
        <div >
          <Spinner />
        </div>
      )}
      <h1 >
        Become a Medusa Store Member
      </h1>
      <p >
        Create your Medusa Store Member profile, and get access to an enhanced
        shopping experience.
      </p>
      <form  onSubmit={onSubmit}>
        <div >
          <Input
            label="First name"
            {...register("first_name", { required: "First name is required" })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="Last name"
            {...register("last_name", { required: "Last name is required" })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="Email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Phone"
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label="Password"
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span >
              These credentials do not match our records
            </span>
          </div>
        )}
        <span >
          By creating an account, you agree to Medusa Store&apos;s{" "}
          <Link href="/content/privacy-policy" >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/content/terms-of-use" >
            Terms of Use
          </Link>
          .
        </span>
        <Button  size="xlarge">
          Join
        </Button>
      </form>
      <span >
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
