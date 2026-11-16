import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { Button, Card } from '../components/ui'
export default function Home() {
  const { events, tents, availableTents } = useApp(), { role } = useAuth(), ev = events[0]
  return (<div className="grid items-center gap-10 md:grid-cols-2">
    <section>
      <h1 className="text-5xl leading-tight md:text-6xl">Thrift, treasures, and tents in Cebu City.</h1>
      <p className="mt-4 max-w-md text-lg">Popubec is a community flea market. Small businesses rent a tent, set up shop, and sell to the neighborhood.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to={role === 'Tenant' ? '/apply' : '/login'}><Button>Apply for a tent</Button></Link>
        <Link to="/event"><Button variant="ghost">See the event</Button></Link></div>
    </section>
    <Card className="shadow-[6px_6px_0_#ee9fb6]">
      <img src="/logo.png" alt="The Popubec community flea market logo" className="mx-auto h-40 w-40" />
      <h2 className="mt-3 text-2xl">{ev.name}</h2>
      <p className="text-sm">Date: {ev.date} · Venue: {ev.venue}</p>
      <p className="mt-3 font-display text-3xl">{availableTents} <span className="text-base font-medium">of {tents.length} tents available</span></p>
    </Card></div>)
}
