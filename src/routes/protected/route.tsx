import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/protected')({
  beforeLoad: ({
    context: {
      auth
    }
  }) => {
    const token = auth.isAuthenticated
    if (!token) {
      throw redirect({
        to: '/auth/login',
      })
    }
  },
  component: LayoutComponent,
})

function LayoutComponent() {

  return (
     <Outlet />
  )
}
