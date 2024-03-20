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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import useGetPeople from '../Helpers/useGetPeople'
import { Person, UserSkill } from '../Types/Person';
import './people.css'

const GetTopSkills = (skillsArray: UserSkill[]) => skillsArray?.toSorted((a, b) => a.rating < b.rating ? 1 : -1).splice(0, 3)

const People = () => {
    const pageSize = 10
    const { loading: loadingSkills, resultsAll: people, fetchAll: fetchPeople } = useGetPeople()
    const [pageResults, setPageResults] = useState<Person[]>([])
    const [page, setPage] = useState<number>(0)
    const [filter, setFilter] = useState<string>('')
    const [filteredResults, setFilteredResults] = useState<Person[]>([])

    useEffect(() => {
        fetchPeople()
    }, [fetchPeople])

    useEffect(() => {
        setFilteredResults(people.filter(a => {
            return a.name.toLowerCase().includes(filter.toLowerCase())
        }))
    }, [filter, people])

    useEffect(() => {
        const temp = filteredResults.slice(page * pageSize, (page * pageSize) + pageSize)
        // if (temp.length < pageSize) {
        //     for (let i = 0; i < (pageSize - temp.length); i++) {
        //         temp.push({ id: '', name: '', skills: [], topSkill: {} as UserSkill } as Person)
        //     }
        // }
        setPageResults(temp)
    }, [page, filter, filteredResults])

    if (loadingSkills) {
        return (
            <div className='flex justify-center h-full text-white align-bottom'>
                <ImSpinner9 className='animate-spin my-20' size='100px' />
            </div>
        )
    }

    return (
        <>
            <div className='flex justify-between border-b border-black items-center'>
                <h1 className='text-3xl font-bold px-2 py-4 text-white'>
                    People
                </h1>

                <span className='w-full max-w-sm items-center flex'>
                    <Label className='mr-4 min-w-min text-white font-bold text-xl'>Search</Label>
                    <Input id='person' placeholder='Name' onChange={e => setFilter(e.target.value)} />
                </span>
            </div>
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
                        <TableRow key={id} className=''>
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
                                <div className='grid 3xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-y-2'>
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
                            <TableCell>
                                <div className='flex items-center min-h-full'>
                                    <span className='font-bold mr-1 text-yellow-500'>
                                        {topSkill?.name}
                                    </span>
                                    <span className={`flex items-baseline text-yellow-500`}>
                                        <StarRating rating={topSkill?.rating} />
                                    </span>
                                </div>
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
            <Pager current={page} size={5} setPage={setPage} totalPages={Math.ceil(filteredResults.length / pageSize)} />
        </>
    )
}

export default People
