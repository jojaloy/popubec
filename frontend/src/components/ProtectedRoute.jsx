import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function ProtectedRoute({ roles, children }) {
  const { role } = useAuth(), loc = useLocation()
  return roles.includes(role) ? children : <Navigate to="/login" replace state={{ from: loc.pathname }} />
}
