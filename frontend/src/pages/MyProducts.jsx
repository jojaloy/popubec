import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { Button, Card, Input, Modal, Table, Textarea } from '../components/ui'
const blank = { name: '', price: '', description: '' }
export const peso = (n) => `₱${Number(n).toLocaleString()}`
export default function MyProducts() {
  const { user } = useAuth(), { products, setProducts, tenants } = useApp()
  const [editing, setEditing] = useState(null), [f, setF] = useState(blank), [errs, setErrs] = useState({})
  const tenant = tenants.find((t) => t.id === user.tenantId)
  if (!tenant) return (<Card className="mx-auto max-w-xl"><h1 className="text-2xl">My products</h1>
    <p className="mt-2 text-sm">Set up your business profile first, then you can list products.</p>
    <Link to="/profile/edit" className="mt-3 inline-block text-sm font-semibold text-rose hover:underline">Go to My profile</Link></Card>)
  const mine = products.filter((p) => p.tenantId === tenant.id)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const open = (p) => { setEditing(p ? p.id : 'new'); setF(p ? { name: p.name, price: String(p.price), description: p.description } : blank); setErrs({}) }
  const close = () => setEditing(null)
  const save = (e) => {
    e.preventDefault()
    const v = {}, price = Number(f.price)
    if (!f.name.trim()) v.name = 'Product name is required.'
    if (!f.price.trim() || Number.isNaN(price) || price < 0) v.price = 'Enter a valid price.'
    if (f.description.length > 150) v.description = 'Keep it under 150 characters.'
    setErrs(v)
    if (Object.keys(v).length) return
    const record = { id: editing === 'new' ? `p${Date.now()}` : editing, tenantId: tenant.id, name: f.name.trim(), price, description: f.description.trim() }
    setProducts(editing === 'new' ? [...products, record] : products.map((p) => (p.id === editing ? record : p)))
    close()
  }
  const remove = (p) => { if (window.confirm(`Delete "${p.name}"?`)) setProducts(products.filter((x) => x.id !== p.id)) }
  const columns = [
    { key: 'name', label: 'Product' },
    { key: 'price', label: 'Price', render: (p) => peso(p.price) },
    { key: 'description', label: 'Description' },
    { key: 'actions', label: '', render: (p) => (<div className="flex gap-2">
      <Button variant="ghost" onClick={() => open(p)}>Edit</Button><Button variant="ghost" onClick={() => remove(p)}>Delete</Button></div>) },
  ]
  return (<div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h1 className="text-3xl">My products</h1><p className="text-sm">What visitors will see on your public profile.</p></div>
      <Button onClick={() => open(null)}>Add product</Button></div>
    <Table columns={columns} rows={mine} empty="No products yet. Add your first one." />
    <Modal open={editing !== null} title={editing === 'new' ? 'Add product' : 'Edit product'} onClose={close}>
      <form onSubmit={save} className="space-y-4" noValidate>
        <Input label="Product name" value={f.name} onChange={set('name')} error={errs.name} />
        <Input label="Price (PHP)" type="number" min="0" step="any" value={f.price} onChange={set('price')} error={errs.price} />
        <Textarea label="Description (optional)" value={f.description} onChange={set('description')} error={errs.description} />
        <Button type="submit" className="w-full">Save product</Button>
      </form></Modal></div>)
}
