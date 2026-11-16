import { Card } from '../components/ui'
export default function About() {
  return (<div className="max-w-2xl space-y-5"><h1 className="text-4xl">About Popubec</h1>
    <p className="text-lg">Popubec organizes pop-up events where tenants and small businesses rent tents to showcase and sell their products and services.</p>
    <Card><h2 className="text-xl">For tenants</h2><p className="mt-2">Apply for a tent, track your application, and keep your business profile up to date.</p></Card>
    <Card><h2 className="text-xl">For organizers</h2><p className="mt-2">Manage events, review applications, and keep tent availability accurate.</p></Card>
    <p>Contact: To Be Confirmed</p></div>)
}
