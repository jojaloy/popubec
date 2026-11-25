import { createContext, useContext, useState } from 'react'
import { events as e0 } from '../data/events'
import { tenants as t0 } from '../data/tenants'
import { applications as a0 } from '../data/applications'
import { tents as k0 } from '../data/tents'
const Ctx = createContext()
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
export function AppProvider({ children }) {
  const [events, setEvents] = useState(e0), [tenants, setTenantsState] = useState(() => read('popubec-tenants', t0))
  const setTenants = (next) => { setTenantsState(next); localStorage.setItem('popubec-tenants', JSON.stringify(next)) }
  const [applications, setApplications] = useState(a0), [tents, setTents] = useState(k0)
  const availableTents = tents.filter((t) => t.status === 'Available').length
  return <Ctx.Provider value={{ events, setEvents, tenants, setTenants, applications, setApplications, tents, setTents, availableTents }}>{children}</Ctx.Provider>
}
export const useApp = () => useContext(Ctx)
