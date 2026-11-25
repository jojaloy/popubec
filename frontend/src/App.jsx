import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import EditProfile from './pages/EditProfile'
import TenantProfile from './pages/TenantProfile'
import Placeholder from './pages/Placeholder'
const ph = (title, card) => <Placeholder title={title} card={card} />
const guard = (roles, el) => <ProtectedRoute roles={roles}>{el}</ProtectedRoute>
const T = ['Tenant'], A = ['Admin']
export default function App() {
  return (<Routes><Route element={<Layout />}>
    <Route index element={<Home />} /><Route path="about" element={<About />} /><Route path="login" element={<Login />} /><Route path="register" element={<Register />} />
    <Route path="event" element={ph('Pop-Up Event', '3.3')} /><Route path="tenants/:id" element={<TenantProfile />} />
    <Route path="apply" element={guard(T, ph('Tenant Application', '4.1'))} /><Route path="status" element={guard(T, ph('Application Status', '4.2'))} />
    <Route path="profile/edit" element={guard(T, <EditProfile />)} /><Route path="reservations" element={guard(T, ph('My Reservations', '4.4'))} />
    <Route path="admin" element={guard(A, ph('Admin Dashboard', '5.1'))} /><Route path="admin/events" element={guard(A, ph('Event Management', '5.2'))} />
    <Route path="admin/applications" element={guard(A, ph('Application Management', '5.3'))} /><Route path="admin/tenants" element={guard(A, ph('Tenant Management', '5.5'))} />
    <Route path="*" element={ph('Page not found', '1.4')} /></Route></Routes>)
}
