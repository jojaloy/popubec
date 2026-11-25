import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { Button, Card, Stat, StatusBadge } from '../components/ui'
const dot = { Available: 'bg-emerald-200', Reserved: 'bg-amber-200', Occupied: 'bg-blush' }
export default function Home() {
  const { events, tents, tenants, availableTents } = useApp(), { role } = useAuth(), ev = events[0]
  const [cat, setCat] = useState('All')
  const cats = [...new Set(tenants.map((t) => t.category))]
  const shown = cat === 'All' ? tenants : tenants.filter((t) => t.category === cat)
  const count = (s) => tents.filter((t) => t.status === s).length
  const taken = tents.length - availableTents
  const catBtn = (name, n) => (
    <li key={name}><button onClick={() => setCat(name)} aria-pressed={cat === name}
      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm ${cat === name ? 'bg-blush/30 font-semibold text-rose' : 'hover:bg-cocoa/5'}`}>
      <span>{name === 'All' ? 'All categories' : name}</span><span className="text-xs text-cocoa/60">{n}</span></button></li>)
  return (<div className="grid gap-6 lg:grid-cols-[1fr_300px]">
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="relative bg-cocoa px-6 pb-20 pt-10 text-center text-white">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-xl border border-white/25 bg-white/10"><img src="/logo.png" alt="The Popubec community flea market logo" className="h-12 w-12" /></span>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/80">Thrift, treasures, and tents in Cebu City. Small businesses rent a tent, set up shop, and sell to the neighborhood.</p>
          <Link to="/event"><Button variant="ghost" className="mt-4 !border-white/40 !bg-transparent !text-white hover:!bg-white/10">See the event</Button></Link>
          <h1 className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-6 pb-4 pt-8 text-left text-2xl">{ev.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4 border-b border-cocoa/10 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-blush font-display font-semibold text-cocoa">P</span>
          <div className="flex-1"><p className="text-sm font-semibold">Hosted by The Popubec</p><p className="text-xs text-cocoa/60">Community flea market</p></div>
          <div className="text-sm"><p className="text-xs text-cocoa/60">Open tents</p><p className="font-semibold">{availableTents}</p></div>
          {role !== 'User' && <Link to={role === 'Tenant' ? '/apply' : '/login'}><Button>Apply for a tent</Button></Link>}
        </div>
        <div className="grid grid-cols-1 gap-4 border-b border-cocoa/10 p-4 sm:grid-cols-3">
          <Stat label="Date" value={ev.date} /><Stat label="Location" value={ev.venue} /><Stat label="Tents" value={`${availableTents} of ${tents.length} available`} />
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-paper px-4 py-3 text-xs">
          <span className="font-semibold uppercase tracking-wide text-cocoa/60">Reserved <span className="ml-1 text-cocoa">{count('Reserved')}</span></span>
          <span className="font-semibold uppercase tracking-wide text-cocoa/60">Occupied <span className="ml-1 text-cocoa">{count('Occupied')}</span></span>
          <div className="ml-auto flex min-w-40 flex-1 items-center gap-2 sm:max-w-60">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-cocoa/10"><div className="h-full bg-rose" style={{ width: `${(taken / tents.length) * 100}%` }} /></div>
            <span className="text-cocoa/70">{Math.round((taken / tents.length) * 100)}% booked</span></div>
        </div>
      </Card>
      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-xl">Featured tenants</h2><span className="text-sm text-cocoa/60">{shown.length} shown</span></div>
        <div className="space-y-3">
          {shown.map((t) => (<Card key={t.id} className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-blush/40 font-display text-lg font-semibold">{t.name[0]}</span>
            <div className="min-w-0 flex-1"><h3 className="text-base">{t.name}</h3><p className="text-xs font-semibold uppercase tracking-wide text-rose">{t.category}</p><p className="mt-1 text-sm">{t.description}</p></div>
            <Link to={`/tenants/${t.id}`} className="shrink-0 text-sm font-semibold text-rose hover:underline">View profile</Link></Card>))}
          {!shown.length && <Card className="text-center text-sm">No tenants in this category yet.</Card>}
        </div></section>
    </div>
    <aside className="space-y-6">
      <Card><h2 className="text-base uppercase tracking-wide text-cocoa/60">Tent availability</h2>
        <div className="mt-3 grid grid-cols-6 gap-1.5">{tents.map((t, i) => <span key={t.id} title={`${t.id} · ${t.status}`} className={`grid aspect-square place-items-center rounded text-[10px] font-semibold ${dot[t.status]}`}>{i + 1}</span>)}</div>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">{Object.keys(dot).map((s) => <span key={s} className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-sm ${dot[s]}`} />{s}</span>)}</div></Card>
      <Card><h2 className="text-base uppercase tracking-wide text-cocoa/60">Categories</h2>
        <ul className="mt-3 space-y-1">{catBtn('All', tenants.length)}{cats.map((c) => catBtn(c, tenants.filter((t) => t.category === c).length))}</ul></Card>
    </aside></div>)
}