import { useCallback, useState } from "react"
import { peopleDB } from "../Mock"
import { Person } from "../Types/Person"

const useGetPeople = () => {
    const [resultsAll, setResultsAll] = useState<Person[]>([])
    const [resultsSingle, setResultsSingle] = useState<Person>()
    const [loading, setLoading] = useState(false)

    const apiCall = useCallback((searchIdString: string = '') => {
        return new Promise<Person[]>((resolve, reject) => {
            try {
                const people = peopleDB.list()

                if (searchIdString) {
                    const r = people.filter(i => i.id === searchIdString)
                    resolve(r)
                } else {
                    resolve(people)
                }
            } catch (error) {
                reject(error)
            }
        })
    }, [])

    const fetchAll = useCallback(() => {
        setLoading(true)

        apiCall().then((data) => {
            setResultsAll(data)
            setLoading(false)
        })

        // TODO: make mock switch here
    }, [apiCall])

    const fetch = useCallback((searchId: string = '') => {
        setLoading(true)

        apiCall(searchId).then((data) => {
            setResultsSingle(data[0])
            setLoading(false)
        })

        setLoading(false)
    }, [apiCall])

    return {
        loading,
        resultsAll,
        resultsSingle,
        fetchAll,
        fetch
    }
}

export default useGetPeople
