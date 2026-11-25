import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { Button, Card, Input, Select, Textarea } from '../components/ui'
const CATEGORIES = ['Thrift clothing', 'Food', 'Crafts', 'Accessories', 'Home & decor', 'Other']
const MAX_DESC = 200
export default function EditProfile() {
  const { user, updateUser } = useAuth(), { tenants, setTenants } = useApp()
  const tenant = tenants.find((t) => t.id === user.tenantId)
  const [f, setF] = useState({ name: tenant?.name ?? user.name, category: tenant?.category ?? '', description: tenant?.description ?? '', contact: tenant?.contact ?? '' })
  const [errs, setErrs] = useState({}), [saved, setSaved] = useState(false)
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setSaved(false) }
  const submit = (e) => {
    e.preventDefault()
    const v = {}
    if (!f.name.trim()) v.name = 'Business name is required.'
    if (!f.category) v.category = 'Pick a category.'
    if (f.description.length > MAX_DESC) v.description = `Keep it under ${MAX_DESC} characters.`
    setErrs(v)
    if (Object.keys(v).length) return
    const id = tenant?.id ?? Math.max(0, ...tenants.map((t) => t.id)) + 1
    const record = { id, name: f.name.trim(), category: f.category, description: f.description.trim(), contact: f.contact.trim() }
    setTenants(tenant ? tenants.map((t) => (t.id === id ? record : t)) : [...tenants, record])
    updateUser({ name: record.name, tenantId: id })
    setSaved(true)
  }
  return (<div className="grid gap-6 md:grid-cols-2">
    <Card>
      <h1 className="text-3xl">My profile</h1>
      <p className="mt-1 text-sm">This is what visitors see about your business.</p>
      <form onSubmit={submit} className="mt-4 space-y-4" noValidate>
        <Input label="Business name" value={f.name} onChange={set('name')} error={errs.name} />
        <Select label="Category" value={f.category} onChange={set('category')} error={errs.category}>
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Textarea label="Description" value={f.description} onChange={set('description')} error={errs.description} />
        <p className="-mt-3 text-right text-xs">{f.description.length}/{MAX_DESC}</p>
        <Input label="Contact (optional)" placeholder="Facebook page, Instagram, or phone" value={f.contact} onChange={set('contact')} />
        <Button type="submit" className="w-full">Save profile</Button>
        {saved && <p role="status" className="text-sm font-semibold">Profile saved.</p>}
      </form>
      <p className="mt-3 text-xs">Demo only: profiles are stored in this browser.</p>
    </Card>
    <Card className="self-start">
      <h2 className="text-xl">Preview</h2>
      <div className="mt-3 rounded-xl border-2 border-cocoa/30 p-4">
        <h3 className="text-xl">{f.name.trim() || 'Your business name'}</h3>
        <p className="text-sm font-medium">{f.category || 'Category'}</p>
        <p className="mt-2">{f.description.trim() || 'Your description will show here.'}</p>
        {f.contact.trim() && <p className="mt-2 text-sm">Contact: {f.contact.trim()}</p>}
      </div>
      {tenant && <Link to={`/tenants/${tenant.id}`} className="mt-3 inline-block text-sm font-semibold underline">View public profile</Link>}
    </Card></div>)
}
