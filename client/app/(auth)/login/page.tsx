import GridBackground from "@/components/patterns/GridBackgound"
import LoginForm from "@/features/auth/components/LoginForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <Link href="/" className="absolute flex items-center text-orange-400 top-6 left-6  transition hover:text-orange-300">
        <ArrowLeft size={24} /> back to home
      </Link>
      <LoginForm />
      <GridBackground />
    </div>
  )
}

export default LoginPage