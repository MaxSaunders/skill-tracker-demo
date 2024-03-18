import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ImSpinner9 } from "react-icons/im";
import { FaChevronDown } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Pager from '@/components/ui/pager';
import useGetSkills from '../Helpers/useGetSkills'
import useGetPeople from '@/Helpers/useGetPeople';
import { Skill } from '@/Types/Skill';
import { Person } from '@/Types/Person';
import './skills.css'

const getTopUsersList = (skill: Skill, usersArray: Person[]) => {
    const topPeople = usersArray.toSorted((a, b) => {
        const userARating = a.skills.find(i => i.id === skill.id)?.rating ?? 0
        const userBRating = b.skills.find(i => i.id === skill.id)?.rating ?? 0
        return userARating > userBRating ? -1 : 1
    })

    return topPeople.map(p => ({ rating: p.skills.find(i => i.id === skill.id)?.rating ?? 0, ...p }))
}

interface CollapsibleRowProps {
    skill: Skill;
    people: Person[];
}

const CollapsibleRow: React.FC<CollapsibleRowProps> = ({ skill, people }) => {
    const [isOpen, setIsOpen] = useState(false)
    const sortedPeopleList = getTopUsersList(skill, people)
    const top3People = sortedPeopleList.slice(0, 3)
    return (
        <Collapsible key={skill.id} asChild onOpenChange={setIsOpen} open={isOpen}>
            <>
                <CollapsibleTrigger className='cursor-pointer' asChild onClick={() => setIsOpen(i => !i)}>
                    <TableRow>
                        <TableCell className="font-medium">{skill.name}</TableCell>
                        <TableCell>{skill.description}</TableCell>
                        <TableCell>
                            <span className='flex items-center justify-between'>
                                {top3People.map(person =>
                                    <span className='mr-3' key={person.id}>
                                        <span className='mr-1'>
                                            {person.name} -
                                        </span>
                                        <span>
                                            {person.rating}
                                        </span>
                                    </span>
                                )}
                                <span className='flex cursor-pointer align-center'>
                                    <FaChevronDown className={`transition-all duration-400 ${isOpen ? 'rotate-180' : ''}`} />
                                </span>
                            </span>
                        </TableCell>
                    </TableRow>
                </CollapsibleTrigger>
                <CollapsibleContent asChild>
                    <TableRow className='hover:bg-transparent'>
                        <TableCell colSpan={3}>
                            <div className='grid gap-y-1 gap-x-0 sm:grid-cols-3 xl:grid-cols-7'>
                                {sortedPeopleList.map(person =>
                                    <Link className='hover:text-blue-500 mr-3 p-1 font-semibold' to={`/people/${person.id}`} key={person.id}>
                                        <span className='mr-1'>
                                            {person.name} -
                                        </span>
                                        <span>
                                            {person.rating}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                </CollapsibleContent>
            </>
        </Collapsible>
    )
}

const Skills = () => {
    const pageSize = 10
    const [page, setPage] = useState<number>(0)
    const [paginatedResults, setPaginatedResults] = useState<Skill[]>([])
    const { loading: loadingSkills, results: skills, fetch: fetchSkills } = useGetSkills()
    const { loading: loadingPeople, resultsAll: people, fetchAll: fetchPeople } = useGetPeople()
    // TODO: add skill form
    // probably add react form dep
    // maybe bring make modal comp for adding new line

    useEffect(() => {
        fetchSkills()
        fetchPeople()
    }, [fetchPeople, fetchSkills])

    useEffect(() => {
        const temp = skills.slice(page * pageSize, (page * pageSize) + pageSize)
        setPaginatedResults(temp)
    }, [skills, pageSize, page])


    if (loadingSkills || loadingPeople) {
        return (
            <div className='flex justify-center h-full text-white align-bottom'>
                <ImSpinner9 className='animate-spin my-20' size='100px' />
            </div>
        )
    }

    return (
        <div className='mb-5'>
            <h1 className='text-3xl font-bold px-2 py-4 text-white border-b border-black'>
                Skills
            </h1>
            <Table className='text-white'>
                <TableCaption>A list of your tracked competencies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold w-[100px]">Skill</TableHead>
                        <TableHead className='font-bold'>Description</TableHead>
                        <TableHead className='font-bold'>Top Users</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedResults.map((skill) =>
                        <CollapsibleRow key={skill.id} skill={skill} people={people} />
                    )}
                </TableBody>
            </Table>
            <Pager current={page} setPage={setPage} totalPages={Math.ceil(skills.length / pageSize)} />
        </div>
    )
}

export default Skills
