import { Navigate } from 'react-router';
import { useAuth } from '../context/auth.context';

const RoleBasedRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  switch (user.role.toLowerCase()) {
    case 'admin':
      return <Navigate to='/admin/dashboard' replace />;
    case 'student':
      return <Navigate to='/student/dashboard' replace />;
    case 'teacher':
      return <Navigate to='/teacher/dashboard' replace />;
    default:
      return <Navigate to='/login' replace />;
  }
};

export default RoleBasedRedirect;
