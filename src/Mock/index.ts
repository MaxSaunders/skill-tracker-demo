import { Person } from '../Types/Person'
import { Skill } from '../Types/Skill'
import createDb from './tools/createMockServiceDb'
import initializeDbs from './tools/initializeDbs'

if (!window.localStorage.getItem("MOCK_ENABLED")) {
  window.localStorage.setItem("MOCK_ENABLED", 'f')
}
export const mockEnabled = window.localStorage.getItem("MOCK_ENABLED") == 't'

export const peopleDB = createDb<Person>(window.localStorage)('PEOPLE_DB')
export const skillsDB = createDb<Skill>(window.localStorage)('SKILLS_DB')

export const clearDbs = () => {
  peopleDB.clear()
  skillsDB.clear()
}

export const enableMock = () => {
  window.localStorage.setItem("MOCK_ENABLED", 't')
  if (peopleDB.count() === 0) {
    initializeDbs()
    window.location.reload()
  }
}

export const disableMock = () => {
  clearDbs()
  window.localStorage.setItem("MOCK_ENABLED", 'f')
}

export const toggleMock = () => {
  if (mockEnabled) {
    disableMock()
  } else {
    enableMock()
  }
}

if (mockEnabled) {
  enableMock()
} else {
  disableMock()
}
