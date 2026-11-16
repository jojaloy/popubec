export const tents = Array.from({ length: 24 }, (_, i) => ({ id: `T${i + 1}`, status: i < 2 ? 'Occupied' : i < 6 ? 'Reserved' : 'Available' }))
