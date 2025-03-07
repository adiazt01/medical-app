import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/modules/auth/hooks/useAuth'

export const Route = createFileRoute('/protected/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { accessTokenData } = useAuth()

  return (
    <>
     
    </>
  )
}
