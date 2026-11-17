import { Card } from '../components/ui'
export default function About() {
  return (<div className="space-y-6"><div className="max-w-2xl"><h1 className="text-3xl">About Popubec</h1>
    <p className="mt-2">Popubec organizes pop-up events where tenants and small businesses rent tents to showcase and sell their products and services.</p></div>
    <div className="grid gap-4 md:grid-cols-2">
      <Card><h2 className="text-xl">For tenants</h2><p className="mt-2 text-sm">Apply for a tent, track your application, and keep your business profile up to date.</p></Card>
      <Card><h2 className="text-xl">For organizers</h2><p className="mt-2 text-sm">Manage events, review applications, and keep tent availability accurate.</p></Card></div>
    <p className="text-sm text-cocoa/70">Contact: To Be Confirmed</p></div>)
}
