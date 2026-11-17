import { useEffect } from 'react'
const cx = (...a) => a.filter(Boolean).join(' ')
export const Button = ({ variant = 'primary', className, ...p }) => (
  <button className={cx('rounded-md border px-4 py-2 text-sm font-semibold disabled:opacity-50',
    variant === 'primary' ? 'border-rose bg-rose text-white hover:bg-rose/90' : 'border-cocoa/25 bg-white text-cocoa hover:bg-cocoa/5', className)} {...p} />)
export const Field = ({ label, error, as: T = 'input', className, ...p }) => (
  <label className="block text-sm font-medium">{label}
    <T className={cx('mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm', error ? 'border-rose' : 'border-cocoa/25', className)} {...p} />
    {error && <span className="mt-1 block text-xs text-rose">{error}</span>}</label>)
export const Input = (p) => <Field {...p} />
export const Select = (p) => <Field as="select" {...p} />
export const Textarea = (p) => <Field as="textarea" rows={4} {...p} />
export const Card = ({ className, ...p }) => <div className={cx('rounded-lg border border-cocoa/15 bg-white p-5 shadow-sm', className)} {...p} />
export const Stat = ({ label, value }) => (
  <div><p className="text-xs font-semibold uppercase tracking-wide text-cocoa/60">{label}</p><p className="mt-1 text-sm font-medium">{value}</p></div>)
export function Modal({ open, title, onClose, children }) {
  useEffect(() => { const f = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [onClose])
  if (!open) return null
  return (<div className="fixed inset-0 z-50 grid place-items-center bg-cocoa/50 p-4" onClick={onClose}>
    <Card role="dialog" aria-modal="true" className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
      <div className="mb-3 flex items-center justify-between"><h2 className="text-xl">{title}</h2><button onClick={onClose} aria-label="Close">✕</button></div>{children}</Card></div>)
}
export const Table = ({ columns, rows, empty = 'Nothing here yet.' }) => (
  <div className="overflow-x-auto rounded-lg border border-cocoa/15 bg-white shadow-sm"><table className="w-full text-left text-sm">
    <thead className="bg-cocoa/5 text-xs uppercase tracking-wide text-cocoa/70"><tr>{columns.map((c) => <th key={c.key} className="p-3 font-semibold">{c.label}</th>)}</tr></thead>
    <tbody>{rows.length ? rows.map((r, i) => <tr key={r.id ?? i} className="border-t border-cocoa/10">{columns.map((c) => <td key={c.key} className="p-3">{c.render ? c.render(r) : r[c.key]}</td>)}</tr>)
      : <tr><td className="p-6 text-center" colSpan={columns.length}>{empty}</td></tr>}</tbody></table></div>)
const tone = { Pending: 'bg-amber-100 text-amber-900', Approved: 'bg-emerald-100 text-emerald-900', Rejected: 'bg-red-100 text-red-900', Available: 'bg-emerald-100 text-emerald-900', Reserved: 'bg-amber-100 text-amber-900', Occupied: 'bg-blush/50 text-cocoa' }
export const StatusBadge = ({ status }) => <span className={cx('rounded-full px-2.5 py-0.5 text-xs font-semibold', tone[status])}>{status}</span>
