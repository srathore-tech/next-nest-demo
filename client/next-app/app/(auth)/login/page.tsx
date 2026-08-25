import LoginForm from "@/features/auth/components/LoginForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <Link href="/" className="absolute top-6 left-6 text-zinc-400 transition hover:text-zinc-300">
        <ArrowLeft size={24} /> back to home
      </Link>
      <LoginForm />
    </div>
  )
}

export default LoginPage