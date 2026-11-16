import { useNavigate } from 'react-router-dom'
import { ROLES, useAuth } from '../context/AuthContext'
import { Button, Card } from '../components/ui'
export default function Login() {
  const { login } = useAuth(), go = useNavigate()
  return (<Card className="mx-auto max-w-md text-center"><h1 className="text-3xl">Choose a role</h1>
    <p className="mt-2 text-sm">Demo login. Real authentication comes later.</p>
    <div className="mt-5 grid gap-3">{ROLES.map((r) => <Button key={r} onClick={() => { login(r); go(r === 'Admin' ? '/admin' : '/') }}>Continue as {r}</Button>)}</div></Card>)
}
