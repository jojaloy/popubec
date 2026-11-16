import { createContext, useContext, useState } from 'react'
const Ctx = createContext()
export const ROLES = ['Visitor', 'Tenant', 'Admin']
export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('popubec-role') || 'Visitor')
  const login = (r) => { setRole(r); localStorage.setItem('popubec-role', r) }
  return <Ctx.Provider value={{ role, login, logout: () => login('Visitor') }}>{children}</Ctx.Provider>
}
export const useAuth = () => useContext(Ctx)
