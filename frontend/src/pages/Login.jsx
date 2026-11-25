import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Card, Input } from '../components/ui'
export default function Login() {
  const { user, login } = useAuth(), go = useNavigate(), loc = useLocation()
  const [f, setF] = useState({ email: '', password: '' }), [err, setErr] = useState('')
  if (user) return <Navigate to="/" replace />
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (!f.email || !f.password) return setErr('Please enter your email and password.')
    const r = login(f.email, f.password)
    if (!r.ok) return setErr(r.error)
    go(loc.state?.from || (r.user.role === 'Admin' ? '/admin' : '/'), { replace: true })
  }
  return (<Card className="mx-auto max-w-md"><h1 className="text-3xl">Log in</h1>
    <form onSubmit={submit} className="mt-4 space-y-4" noValidate>
      <Input label="Email" type="email" autoComplete="email" value={f.email} onChange={set('email')} />
      <Input label="Password" type="password" autoComplete="current-password" value={f.password} onChange={set('password')} />
      {err && <p role="alert" className="text-rose">{err}</p>}
      <Button type="submit" className="w-full">Log in</Button></form>
    <p className="mt-4 text-sm">New here? <Link to="/register" className="font-semibold underline">Create an account</Link></p>
    <p className="mt-4 rounded-xl bg-blush/30 p-3 text-xs">Demo accounts: admin@popubec.ph / admin123 · tenant@popubec.ph / tenant123 · user@popubec.ph / user123</p></Card>)
}