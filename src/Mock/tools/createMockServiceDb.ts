export type Entry = {
  id: string
}

const createMockServiceDb = <T extends Entry>(browserStorage: Storage) => (DB_NAME: string) => {
  let entries: T[] = []

  let autoSave = true

  const setAutoSave = (b: boolean) => (autoSave = b)

  const save = () => {
    browserStorage.setItem(DB_NAME, JSON.stringify(entries))
  }

  const load = () => {
    entries = []
    const json = browserStorage.getItem(DB_NAME)
    if (json) {
      entries = JSON.parse(json)
    }
  }

  const count = () => entries.length

  const add = (entry: T) => {
    entries = [...entries.filter(e => e.id !== entry.id), entry]
    if (autoSave) save()
    return { id: entry.id }
  }

  const remove = (id: string) => {
    entries = entries.filter(e => e.id !== id)
    if (autoSave) save()
  }

  const get = (id: string) => entries.find(e => e.id === id)

  const clear = () => {
    entries = []
    browserStorage.removeItem(DB_NAME)
  }

  const list = () => [...entries]

  load()

  return { save, add, get, clear, count, setAutoSave, load, remove, list }
}

export default createMockServiceDb
