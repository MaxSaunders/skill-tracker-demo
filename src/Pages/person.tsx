import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import { BiSort } from "react-icons/bi";
import { FaUser } from 'react-icons/fa';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGetPeople from "@/Helpers/useGetPeople"
import StarRating from '@/components/ui/starRating';
import { Card } from '@/components/ui/card';
import { UserSkill } from '@/Types/Person';

const Person = () => {
    const [sort, setSort] = useState<keyof UserSkill>('rating')
    const [asc, setAsc] = useState<boolean>(true)
    const [sortedSkills, setSortedSkills] = useState<UserSkill[]>([])
    const { fetch: fetchUser, resultsSingle: user, loading: loadingPeople } = useGetPeople()
    const { id } = useParams()

    const _sort = useCallback((field: keyof UserSkill) => {
        if (sort == field && asc) {
            setAsc(false)
        } else {
            setSort(field)
            setAsc(true)
        }
    }, [asc, sort])

    useEffect(() => {
        fetchUser(id)
    }, [id, fetchUser])

    useEffect(() => {
        if (user) {
            setSortedSkills(user.skills.toSorted((a, b) => {
                return (a[sort] < b[sort] ? -1 : 1) * (asc ? -1 : 1)
            }))
        } else {
            setSortedSkills([])
        }
    }, [user, sort, asc])

    if (loadingPeople) {
        return (
            <div className='flex justify-center h-full text-white align-bottom'>
                <ImSpinner9 className='animate-spin my-20' size='100px' />
            </div>
        )
    }

    if (!user) {
        return (
            <div className='flex justify-center mt-20'>
                <Card className='justify-center flex bg-transparent min-w-min w-1/2 text-red-500 font-bold text-5xl py-10 border-red-600'>
                    <span className='mr-4'>
                        <FaUser />
                    </span>
                    <span>
                        No user found
                    </span>
                </Card>
            </div>
        )
    }

    return (
        <>
            <h1 className='font-bold mx-3 my-5 text-white text-5xl'>
                {user?.name}
            </h1>

            <hr />

            <Card className='m-5 p-5 text-white bg-transparent items-center w-1/3 min-w-min'>
                <div className='font-bold text-3xl mb-3'>
                    Top Skill
                </div>
                <div className='font-bold text-xl flex items-center'>
                    <span className='mr-4'>
                        {user?.topSkill.name}
                    </span>
                    <span>
                        <StarRating rating={user?.topSkill.rating} />
                    </span>
                </div>
            </Card>

            <Table>
                <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                        <TableHead>
                            <div onClick={() => _sort('name')} className='flex items-center font-bold hover:text-blue-500 hover:bg-opacity-70 hover:bg-white px-3 py-1 rounded w-min cursor-pointer'>
                                Skill
                                <BiSort />
                            </div>
                        </TableHead>
                        <TableHead>
                            <div onClick={() => _sort('rating')} className='flex items-center font-bold hover:text-blue-500 hover:bg-opacity-70 hover:bg-white px-3 py-1 rounded w-min cursor-pointer'>
                                Rating
                                <BiSort />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedSkills.map(s =>
                        <TableRow key={s.id}>
                            <TableCell>
                                <span className='flex items-center' key={s.id}>
                                    <span className='text-white font-semibold'>
                                        {s.name}
                                    </span>
                                </span>
                            </TableCell>
                            <TableCell>
                                <span><StarRating rating={s.rating} /></span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default Person
