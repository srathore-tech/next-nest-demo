import RegisterForm from "@/features/auth/components/RegisterForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-zinc-50">
       <Link href="/" className="absolute flex items-center text-orange-400 top-6 left-6  transition hover:text-orange-300">
        <ArrowLeft size={24} /> back to home
      </Link>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage