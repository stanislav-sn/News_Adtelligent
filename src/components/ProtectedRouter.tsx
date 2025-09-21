import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
