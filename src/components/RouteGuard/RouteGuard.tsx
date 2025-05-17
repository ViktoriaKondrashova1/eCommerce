import type { ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { Navigate, useLocation } from 'react-router-dom'
import { customerStore } from '@/entities/customer/model/customer.store'

interface RouteGuardProps {
  children: ReactNode
  redirectTo: string
  redirectIf: 'authorized' | 'unauthorized'
}

export const RouteGuard = observer(({
  children,
  redirectTo,
  redirectIf,
}: RouteGuardProps): JSX.Element => {
  const location = useLocation()

  const flags = {
    authorized: customerStore.isAuth,
    unauthorized: !customerStore.isAuth,
  }

  if (flags[redirectIf]) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  return <>{children}</>
})
