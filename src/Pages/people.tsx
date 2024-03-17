import { useEffect, useState } from 'react'
import { ImSpinner9 } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Pager from '@/components/ui/pager';

import useGetPeople from '../Helpers/useGetPeople'
import { Person, UserSkill } from '../Types/Person';
import './people.css'

const RenderStars = (count: number = 0) => {
    const render = []
    for (let i = 0; i < count; i++) {
        render.push(
            <FaStar />
        )
    }
    return render
}

const GetTopSkills = (skillsArray: UserSkill[]) => skillsArray.toSorted((a, b) => a.rating < b.rating ? 1 : -1).splice(0, 3)

const People = () => {
    const pageSize = 10
    const { loading: loadingSkills, resultsAll: people, fetchAll: fetchPeople } = useGetPeople()
    const [pageResults, setPageResults] = useState<Person[]>([])
    const [page, setPage] = useState<number>(0)

    useEffect(() => {
        fetchPeople()
    }, [fetchPeople])

    useEffect(() => {
        setPageResults(people.slice(page * pageSize, (page * pageSize) + pageSize))
    }, [people, page])

    if (loadingSkills) {
        return (
            <div className='flex justify-center h-full text-white align-bottom'>
                <ImSpinner9 className='animate-spin my-20' size='100px' />
            </div>
        )
    }
    console.log(pageResults[0])

    return (
        <>
            <h1 className='text-3xl py-4 text-white'>
                People
            </h1>
            <Table className='text-white'>
                <TableCaption>A list of your tracked employees</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold w-[400px]">Name</TableHead>
                        <TableHead className='font-bold'>Top Skills</TableHead>
                        <TableHead className='font-bold'>Top Skill</TableHead>
                        <TableHead className='font-bold'>Attitude</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pageResults.map(({ id, name, skills, topSkill }) =>
                        <TableRow key={id}>
                            <TableCell className="font-medium">{name}</TableCell>
                            <TableCell>
                                <div className='flex'>
                                    {GetTopSkills(skills).map(({ rating, name }) =>
                                        <div className='flex items-center' key={name}>
                                            <span className='font-bold'>
                                                {name}&nbsp;&nbsp;
                                            </span>
                                            <span className={`flex items-baseline rating-color-${rating}`}>
                                                {RenderStars(rating)}
                                            </span>
                                            <span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>{topSkill?.name}</TableCell>
                            <TableCell>Angry Boi</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pager current={page} size={5} setPage={setPage} totalPages={people.length / pageSize} />
        </>
    )
}

export default People
