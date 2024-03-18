import { Entry } from "../Mock/tools/createMockServiceDb"

export type Skill = Entry & {
    name: string,
    description: string
}
