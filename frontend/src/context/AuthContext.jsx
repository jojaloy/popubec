import { createContext, useContext, useState } from 'react'
import { seedUsers } from '../data/users'
const Ctx = createContext()
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const strip = ({ password, ...safe }) => safe
export function AuthProvider({ children }) {
  const [registered, setRegistered] = useState(() => read('popubec-users', []))
  const [user, setUser] = useState(() => read('popubec-session', null))
  const role = user?.role ?? 'Visitor'
  const save = (u) => { setUser(u); u ? localStorage.setItem('popubec-session', JSON.stringify(u)) : localStorage.removeItem('popubec-session') }
  const login = (email, password) => {
    const u = [...seedUsers, ...registered].find((x) => x.email === email.trim().toLowerCase() && x.password === password)
    if (!u) return { ok: false, error: 'Incorrect email or password.' }
    save(strip(u)); return { ok: true, user: strip(u) }
  }
  const register = ({ name, email, password }) => {
    const mail = email.trim().toLowerCase()
    if ([...seedUsers, ...registered].some((x) => x.email === mail)) return { ok: false, error: 'That email is already registered.' }
    const u = { id: `u${Date.now()}`, name: name.trim(), email: mail, password, role: 'Tenant' }
    const next = [...registered, u]; setRegistered(next); localStorage.setItem('popubec-users', JSON.stringify(next))
    save(strip(u)); return { ok: true, user: strip(u) }
  }
  return <Ctx.Provider value={{ user, role, login, register, logout: () => save(null) }}>{children}</Ctx.Provider>
}
export const useAuth = () => useContext(Ctx)
