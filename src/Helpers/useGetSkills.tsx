import { useCallback, useState } from "react"
import { skillsDB } from "../Mock"
import { Skill } from "../Types/Skill"

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

    return {
        loading,
        results,
        fetch
    }
}

export default useGetSkills
