import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Button } from './ui'
import { useAuth } from '../context/AuthContext'
const nav = {
  Visitor: [['/', 'Home'], ['/about', 'About'], ['/event', 'Event']],
  Tenant: [['/', 'Home'], ['/about', 'About'], ['/event', 'Event'], ['/apply', 'Apply'], ['/status', 'My application'], ['/reservations', 'Reservations'], ['/profile/edit', 'My profile']],
  Admin: [['/', 'Home'], ['/admin', 'Dashboard'], ['/admin/events', 'Events'], ['/admin/applications', 'Applications'], ['/admin/tenants', 'Tenants']],
}
export default function Layout() {
  const { role, user, logout } = useAuth(), go = useNavigate()
  const link = ({ isActive }) => `rounded-full px-3 py-1 ${isActive ? 'bg-blush' : 'hover:bg-blush/40'}`
  return (<div className="flex min-h-screen flex-col">
    <header className="sticky top-0 z-40 border-b-2 border-cocoa bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold"><img src="/logo.png" alt="" className="h-10 w-10" />the popubec</Link>
        <nav className="flex flex-1 flex-wrap gap-1 text-sm font-medium">{nav[role].map(([to, label]) => <NavLink key={to} to={to} end className={link}>{label}</NavLink>)}</nav>
        {user ? <div className="flex items-center gap-3 text-sm"><span>Hi, {user.name} ({role})</span><Button onClick={() => { logout(); go('/') }} className="!py-1 text-sm">Log out</Button></div>
          : <div className="flex gap-3 font-display font-semibold"><Link to="/login" className="underline decoration-blush decoration-4">Log in</Link><Link to="/register">Sign up</Link></div>}
      </div></header>
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8"><Outlet /></main>
    <footer className="border-t-2 border-cocoa py-6 text-center text-sm">The Popubec · Community flea market · Cebu City</footer></div>)
}
