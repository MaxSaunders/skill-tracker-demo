import { useCallback, useState } from "react"
import { skillsDB } from "../Mock"
import { Skill } from "../Types/Skill"
import generateId from "@/Mock/tools/generateId"

export interface NewSkillObj {
    name: string,
    description: string
}

const useGetSkills = () => {
    const [results, setResults] = useState<Skill[]>([])
    const [loading, setLoading] = useState(false)

    const fetch = useCallback((searchString: string = '') => {
        setLoading(true)

        // TODO: make mock switch here
        const mockData = skillsDB.list()

        if (searchString) {
            const r = mockData.filter(i => i.name.toLowerCase().includes(searchString))
            setResults(r)
        } else {
            setResults(mockData)
        }

        setLoading(false)
    }, [])

    const add = useCallback((skill: NewSkillObj) => {
        return new Promise((resolve, reject) => {
            try {
                skillsDB.add({
                    ...skill,
                    id: generateId()
                } as Skill)
                resolve('void')
            } catch (error) {
                reject(error)
            }
        })
    }, [])

    return {
        loading,
        results,
        fetch,
        add
    }
}

export default useGetSkills
