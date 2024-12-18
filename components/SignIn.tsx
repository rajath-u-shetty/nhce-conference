import UserAuthForm from "./UserAuthForm"
import { Icons } from "./Icons"

const SignIn = () => {
  return (
    <div className=" container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.google className="mx-auto h-6 w-6" />
        <h1 className="text-white text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-white text-sm max-w-xs mx-auto">By continuing, you are setting up a Tapas25.com account and agree to our User agreement and Privacy Policy.</p>

        {/* sign in form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
            New to Tapas25.com{" "}
        </p>
      </div>
    </div>
  )
}

export default SignIn

