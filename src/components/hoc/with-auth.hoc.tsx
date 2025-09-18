import toast from 'react-hot-toast';
import type { ComponentType } from 'react';
import type { Role } from '../../types/enum';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/auth.context';

export function WithAuth<T>(Component: ComponentType<T>, roles: Role[]) {
  return function ProtectedComponent(props: any) {

    const { isLoading, user } = useAuth()
    const location = useLocation()

    if (isLoading) {
      return <div>Loading</div>
    }

    if (!user) {
      toast.error('You need to login first')
      return <Navigate to={'/login'} replace={true} state={{ from: location.pathname }}/>
    }

    // Role Based
    if (roles && !roles.includes(user.role)) {
      toast.error('Unauthorized. you cannot access this route')
      return <Navigate to={'/login'} replace={true} state={{ from: location.pathname }}/>
    }

    return <Component {...props}/>
  }
}
