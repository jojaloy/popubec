import { Card } from '../components/ui'
export default function Placeholder({ title, card }) {
  return <Card className="max-w-xl"><h1 className="text-3xl">{title}</h1><p className="mt-2">Planned in Trello card {card}. Not built yet.</p></Card>
}
