import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
const P = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
  info: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 16v-4M12 8h.01',
  event: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
  apply: 'M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9zM14 3v6h6M12 12v6M9 15h6',
  status: 'M9 2h6v4H9zM9 4H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-2M9 14l2 2 4-4',
  ticket: 'M2 9V6a1 1 0 011-1h18a1 1 0 011 1v3a3 3 0 000 6v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a3 3 0 000-6z',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  grid: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
  file: 'M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9zM14 3v6h6M8 13h8M8 17h8',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  box: 'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
  menu: 'M4 6h16M4 12h16M4 18h16',
  out: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
}
const Icon = ({ d }) => <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
const browse = { title: 'Browse', items: [['/', 'Home', P.home], ['/about', 'About', P.info], ['/event', 'Event', P.event]] }
const nav = {
  Visitor: [browse],
  User: [browse],
  Tenant: [browse, { title: 'My account', items: [['/apply', 'Apply', P.apply], ['/status', 'My application', P.status], ['/reservations', 'Reservations', P.ticket], ['/profile/edit', 'My profile', P.user], ['/products', 'My products', P.box]] }],
  Admin: [{ title: 'Overview', items: [['/', 'Home', P.home], ['/admin', 'Dashboard', P.grid]] },
    { title: 'Manage', items: [['/admin/events', 'Events', P.event], ['/admin/applications', 'Applications', P.file], ['/admin/tenants', 'Tenants', P.users]] }],
}
export default function Layout() {
  const { role, user, logout } = useAuth(), { tents, availableTents } = useApp(), go = useNavigate(), { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const groups = nav[role]
  const current = groups.flatMap((g) => g.items).find(([to]) => to === pathname)
  const cta = role === 'Admin' ? ['/admin/events', 'Manage events'] : role === 'User' ? ['/event', 'See the event'] : [role === 'Tenant' ? '/apply' : '/login', 'Apply for a tent']
  const link = ({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`
  return (<div className="min-h-screen">
    {open && <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}
    <aside className={`${open ? 'flex' : 'hidden'} fixed inset-y-0 left-0 z-50 w-64 flex-col bg-cocoa text-white md:flex`}>
      <Link to="/" onClick={() => setOpen(false)} className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white"><img src="/logo.png" alt="" className="h-7 w-7" /></span>
        <span className="font-display text-lg font-semibold">the popubec</span></Link>
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5" onClick={() => setOpen(false)}>
        {groups.map((g) => (<div key={g.title}><p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">{g.title}</p>
          <div className="space-y-1">{g.items.map(([to, label, d]) => <NavLink key={to} to={to} end className={link}><Icon d={d} />{label}</NavLink>)}</div></div>))}
      </nav>
      <div className="border-t border-white/10 p-4">
        {user ? (<div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush font-display font-semibold text-cocoa">{user.name[0].toUpperCase()}</span>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{user.name}</p><p className="text-xs text-white/60">{role}</p></div>
          <button onClick={() => { logout(); setOpen(false); go('/') }} aria-label="Log out" title="Log out" className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white"><Icon d={P.out} /></button></div>)
          : (<div className="flex gap-2"><Link to="/login" className="flex-1 rounded-md border border-white/30 py-2 text-center text-sm font-semibold hover:bg-white/10" onClick={() => setOpen(false)}>Log in</Link>
            <Link to="/register" className="flex-1 rounded-md bg-blush py-2 text-center text-sm font-semibold text-cocoa" onClick={() => setOpen(false)}>Sign up</Link></div>)}
      </div></aside>
    <div className="flex min-h-screen flex-col md:pl-64">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-cocoa/15 bg-white px-4 md:px-8">
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-md p-2 hover:bg-cocoa/5 md:hidden"><Icon d={P.menu} /></button>
        <p className="flex-1 truncate font-display text-lg font-semibold">{current ? current[1] : 'The Popubec'}</p>
        <div className="hidden rounded-md border border-cocoa/15 bg-paper px-3 py-1 text-center sm:block">
          <p className="text-xs text-cocoa/60">Tents available</p><p className="text-sm font-semibold">{availableTents} of {tents.length}</p></div>
        <Link to={cta[0]}><Button className="hidden sm:block">{cta[1]}</Button></Link>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8"><Outlet /></main>
      <footer className="border-t border-cocoa/15 bg-white py-4 text-center text-xs text-cocoa/70">The Popubec · Community flea market · Cebu City</footer>
    </div></div>)
}