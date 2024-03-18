import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ImSpinner9 } from "react-icons/im";
import { FaUser } from "react-icons/fa";
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
import StarRating from '@/components/ui/starRating';

import useGetPeople from '../Helpers/useGetPeople'
import { Person, UserSkill } from '../Types/Person';
import './people.css'

const GetTopSkills = (skillsArray: UserSkill[]) => skillsArray?.toSorted((a, b) => a.rating < b.rating ? 1 : -1).splice(0, 3)

const People = () => {
    const pageSize = 10
    const { loading: loadingSkills, resultsAll: people, fetchAll: fetchPeople } = useGetPeople()
    const [pageResults, setPageResults] = useState<Person[]>([])
    const [page, setPage] = useState<number>(0)

    useEffect(() => {
        fetchPeople()
    }, [fetchPeople])

    useEffect(() => {
        const temp = people.slice(page * pageSize, (page * pageSize) + pageSize)
        // if (temp.length < pageSize) {
        //     for (let i = 0; i < (pageSize - temp.length); i++) {
        //         temp.push({ id: '', name: '', skills: [], topSkill: {} as UserSkill } as Person)
        //     }
        // }
        setPageResults(temp)
    }, [people, page])

    if (loadingSkills) {
        return (
            <div className='flex justify-center h-full text-white align-bottom'>
                <ImSpinner9 className='animate-spin my-20' size='100px' />
            </div>
        )
    }

    return (
        <>
            <h1 className='text-3xl font-bold px-2 py-4 text-white border-b border-black'>
                People
            </h1>
            <Table className='text-white'>
                <TableCaption>A list of your tracked employees</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='font-bold min-w-min'>Name</TableHead>
                        <TableHead className='font-bold w-max'>Top Skills</TableHead>
                        <TableHead className='font-bold'>Top Skill</TableHead>
                        <TableHead className='font-bold'>Attitude</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pageResults.map(({ id, name, skills, topSkill }) =>
                        <TableRow key={id}>
                            <TableCell className="font-medium">
                                <Link to={`/people/${id}`} className='hover:text-blue-500 flex items-center'>
                                    <span className='mr-2'>
                                        <FaUser />
                                    </span>
                                    <span className='mr-2'>
                                        {name}
                                    </span>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className='grid 2xl:grid-cols-6 lg:grid-cols-3 grid-cols-1 gap-y-2'>
                                    {GetTopSkills(skills).map(({ rating, name }) =>
                                        <div className='flex items-center' key={name}>
                                            <span className='font-bold mr-1'>
                                                {name}
                                            </span>
                                            <span className={`flex items-baseline`}>
                                                <StarRating rating={rating} />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className='flex items-center'>
                                <span className='font-bold mr-1 text-yellow-500'>
                                    {topSkill?.name}
                                </span>
                                <span className={`flex items-baseline text-yellow-500`}>
                                    <StarRating rating={topSkill?.rating} />
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='flex items-center'>
                                    <span className='mr-2'>
                                        Angry Boi
                                    </span>
                                </span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pager current={page} size={5} setPage={setPage} totalPages={Math.ceil(people.length / pageSize)} />
        </>
    )
}

export default People
