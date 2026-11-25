import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Card, Stat } from '../components/ui'
import { peso } from './MyProducts'
export default function TenantProfile() {
  const { id } = useParams(), { tenants, applications, events, products } = useApp()
  const tenant = tenants.find((t) => String(t.id) === id)
  if (!tenant) return (<Card className="mx-auto max-w-xl text-center"><h1 className="text-2xl">Tenant not found</h1>
    <p className="mt-2 text-sm">We could not find that tenant.</p>
    <Link to="/" className="mt-3 inline-block text-sm font-semibold text-rose hover:underline">Back to home</Link></Card>)
  const items = products.filter((p) => p.tenantId === tenant.id)
  const ev = events[0], app = applications.find((a) => a.tenantId === tenant.id && a.eventId === ev.id && a.status === 'Approved')
  return (<div className="mx-auto max-w-2xl space-y-4">
    <Link to="/" className="text-sm font-semibold text-rose hover:underline">← All tenants</Link>
    <Card>
      <div className="flex items-start gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-blush/40 font-display text-2xl font-semibold">{tenant.name[0]}</span>
        <div className="min-w-0"><h1 className="text-3xl">{tenant.name}</h1>
          <p className="text-xs font-semibold uppercase tracking-wide text-rose">{tenant.category}</p></div></div>
      <p className="mt-4">{tenant.description || 'This tenant has not added a description yet.'}</p>
      <div className="mt-5 grid gap-4 border-t border-cocoa/10 pt-4 sm:grid-cols-3">
        <Stat label="Event" value={ev.name} />
        <Stat label="Tent" value={app ? app.tentId : 'To be confirmed'} />
        <Stat label="Contact" value={tenant.contact || 'Not provided'} />
      </div></Card>
    <section>
      <h2 className="mb-3 text-xl">Products</h2>
      {items.length ? (<div className="grid gap-3 sm:grid-cols-2">
        {items.map((p) => (<Card key={p.id}><div className="flex items-start justify-between gap-3">
          <h3 className="text-base">{p.name}</h3><span className="shrink-0 font-semibold text-rose">{peso(p.price)}</span></div>
          {p.description && <p className="mt-1 text-sm">{p.description}</p>}</Card>))}</div>)
        : <Card className="text-center text-sm">No products listed yet.</Card>}
    </section></div>)
}