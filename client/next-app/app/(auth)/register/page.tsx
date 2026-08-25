import RegisterForm from "@/components/forms/RegisterForm"
import Link from "next/link"

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        <Link href="/" className="absolute top-6 left-6 text-zinc-400 transition hover:text-zinc-300">
          Back to Home
        </Link>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage