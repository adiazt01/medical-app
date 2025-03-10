import { LoginForm } from '@/modules/auth/components/form/login-form'
import { RegisterForm } from '@/modules/auth/components/form/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 bg-[url(/src/assets/bg-img.webp)] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative w-full max-w-sm z-10">
        <RegisterForm />
      </div>
    </div>
  )
}