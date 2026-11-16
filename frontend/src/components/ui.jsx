import { useEffect } from 'react'
const cx = (...a) => a.filter(Boolean).join(' ')
export const Button = ({ variant = 'primary', className, ...p }) => (
  <button className={cx('rounded-full border-2 border-cocoa px-5 py-2 font-display font-semibold shadow-[3px_3px_0_#4a3228] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50',
    variant === 'primary' ? 'bg-blush' : 'bg-paper', className)} {...p} />)
export const Field = ({ label, error, as: T = 'input', className, ...p }) => (
  <label className="block text-sm font-medium">{label}
    <T className={cx('mt-1 w-full rounded-xl border-2 bg-white px-3 py-2', error ? 'border-rose' : 'border-cocoa/30', className)} {...p} />
    {error && <span className="text-rose">{error}</span>}</label>)
export const Input = (p) => <Field {...p} />
export const Select = (p) => <Field as="select" {...p} />
export const Textarea = (p) => <Field as="textarea" rows={4} {...p} />
export const Card = ({ className, ...p }) => <div className={cx('rounded-2xl border-2 border-cocoa bg-white p-5', className)} {...p} />
export function Modal({ open, title, onClose, children }) {
  useEffect(() => { const f = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [onClose])
  if (!open) return null
  return (<div className="fixed inset-0 z-50 grid place-items-center bg-cocoa/50 p-4" onClick={onClose}>
    <Card role="dialog" aria-modal="true" className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
      <div className="mb-3 flex items-center justify-between"><h2 className="text-xl">{title}</h2><button onClick={onClose} aria-label="Close">✕</button></div>{children}</Card></div>)
}
export const Table = ({ columns, rows, empty = 'Nothing here yet.' }) => (
  <div className="overflow-x-auto rounded-2xl border-2 border-cocoa bg-white"><table className="w-full text-left text-sm">
    <thead className="bg-blush/40"><tr>{columns.map((c) => <th key={c.key} className="p-3">{c.label}</th>)}</tr></thead>
    <tbody>{rows.length ? rows.map((r, i) => <tr key={r.id ?? i} className="border-t border-cocoa/15">{columns.map((c) => <td key={c.key} className="p-3">{c.render ? c.render(r) : r[c.key]}</td>)}</tr>)
      : <tr><td className="p-6 text-center" colSpan={columns.length}>{empty}</td></tr>}</tbody></table></div>)
const tone = { Pending: 'bg-amber-100', Approved: 'bg-emerald-100', Rejected: 'bg-red-100', Available: 'bg-emerald-100', Reserved: 'bg-amber-100', Occupied: 'bg-blush/60' }
export const StatusBadge = ({ status }) => <span className={cx('rounded-full border border-cocoa/40 px-3 py-0.5 text-xs font-semibold', tone[status])}>{status}</span>
