import { useCallback, useState } from "react"
import { peopleDB } from "../Mock"
import { Person } from "../Types/Person"

const useGetPeople = () => {
    const [resultsAll, setResultsAll] = useState<Person[]>([])
    const [resultsSingle, setResultsSingle] = useState<Person>()
    const [loading, setLoading] = useState(false)

    const fetchAll = useCallback((searchString: string = '') => {
        setLoading(true)

        const people = peopleDB.list()

        // TODO: make mock switch here
        if (searchString) {
            const r = people.filter(i => i.name.toLowerCase().includes(searchString))
            setResultsAll(r)
        } else {
            setResultsAll(people)
        }

        setLoading(false)
    }, [])

    const fetch = useCallback((searchId: string = '') => {
        setLoading(true)

        const people = peopleDB.list()

        if (searchId) {
            const r = people.find(i => i.id == searchId)
            setResultsSingle(r)
        }
        // TODO: maybe throw error

        setLoading(false)
    }, [])

    return {
        loading,
        resultsAll,
        resultsSingle,
        fetchAll,
        fetch
    }
}

export default useGetPeople
