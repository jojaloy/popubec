import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function ProtectedRoute({ roles, children }) {
  const { role } = useAuth()
  return roles.includes(role) ? children : <Navigate to="/login" replace />
}
