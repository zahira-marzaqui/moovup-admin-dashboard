export const ok = (res, data) => res.json(data)
export const created = (res, data) => res.status(201).json(data)
export const bad = (res, error) => res.status(400).json({ error })
export const fail = (res, error) => res.status(500).json({ error })
