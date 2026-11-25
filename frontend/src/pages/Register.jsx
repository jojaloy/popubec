import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Card, Input, Select } from '../components/ui'
export default function Register() {
  const { user, register } = useAuth(), go = useNavigate()
  const [f, setF] = useState({ role: 'User', name: '', email: '', password: '', confirm: '' }), [errs, setErrs] = useState({})
  if (user) return <Navigate to="/" replace />
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const isTenant = f.role === 'Tenant'
  const submit = (e) => {
    e.preventDefault()
    const v = {}
    if (!f.name.trim()) v.name = isTenant ? 'Business or owner name is required.' : 'Your name is required.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) v.email = 'Enter a valid email.'
    if (f.password.length < 6) v.password = 'Use at least 6 characters.'
    if (f.confirm !== f.password) v.confirm = 'Passwords do not match.'
    if (!Object.keys(v).length) { const r = register(f); if (r.ok) return go('/'); v.email = r.error }
    setErrs(v)
  }
  return (<Card className="mx-auto max-w-md"><h1 className="text-3xl">Create an account</h1>
    <form onSubmit={submit} className="mt-4 space-y-4" noValidate>
      <Select label="I am joining as" value={f.role} onChange={set('role')}>
        <option value="User">A shopper (browse events and tenants)</option>
        <option value="Tenant">A business owner (rent a tent)</option>
      </Select>
      <Input label={isTenant ? 'Business or owner name' : 'Your name'} value={f.name} onChange={set('name')} error={errs.name} />
      <Input label="Email" type="email" autoComplete="email" value={f.email} onChange={set('email')} error={errs.email} />
      <Input label="Password" type="password" autoComplete="new-password" value={f.password} onChange={set('password')} error={errs.password} />
      <Input label="Confirm password" type="password" autoComplete="new-password" value={f.confirm} onChange={set('confirm')} error={errs.confirm} />
      <Button type="submit" className="w-full">Sign up</Button></form>
    <p className="mt-4 text-sm">Already registered? <Link to="/login" className="font-semibold underline">Log in</Link></p>
    <p className="mt-3 text-xs">Demo only: accounts are stored in this browser. Do not use a real password.</p></Card>)
}