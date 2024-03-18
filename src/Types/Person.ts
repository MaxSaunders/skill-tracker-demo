import { Entry } from "../Mock/tools/createMockServiceDb"

export type UserSkill = Entry & {
    name: string,
    rating: 0|1|2|3|4
}

export type Person = Entry & {
    name: string,
    skills: UserSkill[],
    topSkill: UserSkill,
}