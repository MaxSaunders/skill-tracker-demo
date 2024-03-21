import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetPeople from '@/Helpers/useGetPeople';
import { Skill } from '@/Types/Skill';
import { Person } from '@/Types/Person';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import useGetSkills, { NewSkillObj } from '../Helpers/useGetSkills'
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
                        <TableCell className='text-lg font-bold'>{skill.name}</TableCell>
                        <TableCell className='hidden lg:table-cell max-w-[1000px] whitespace-nowrap overflow-hidden overflow-ellipsis'>{skill.description}</TableCell>
                        <TableCell className='min-w-min'>
                            <span className='grid grid-cols-10 items-center text-lg'>
                                {top3People.map(person =>
                                    <span className='mr-3 col-span-3 grid grid-cols-2' key={person.id}>
                                        <span className='mr-1'>
                                            {person.name}
                                        </span>
                                        <span className='font-bold'>
                                            {person.rating}
                                        </span>
                                    </span>
                                )}
                                <span className='flex cursor-pointer align-center justify-end'>
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
    // TODO: need to add these thing to url params
    // - page number
    // - filter info
    const [paginatedResults, setPaginatedResults] = useState<Skill[]>([])
    const [filteredResults, setFilteredResults] = useState<Skill[]>([])
    const [filter, setFilter] = useState<string>('')
    const { loading: loadingSkills, results: skills, fetch: fetchSkills, add: addSkill } = useGetSkills()
    const { loading: loadingPeople, resultsAll: people, fetchAll: fetchPeople } = useGetPeople()

    const { register, handleSubmit, formState: { errors } } = useForm<NewSkillObj>();
    const [addingNew, setAddingNew] = useState(false)
    const onSubmit = (data: NewSkillObj) => {
        addSkill(data).then(() => {
            fetchSkills()
        })
        setAddingNew(false)
    }

    useEffect(() => {
        fetchSkills()
        fetchPeople()
    }, [fetchPeople, fetchSkills])

    useEffect(() => {
        setFilteredResults(skills.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.description.toLowerCase().includes(filter.toLowerCase())))
    }, [filter, skills])

    useEffect(() => {
        const temp = filteredResults.slice(page * pageSize, (page * pageSize) + pageSize)
        setPaginatedResults(temp)
    }, [pageSize, page, filteredResults])

    const validateName = (newName: string) => skills.find(s => s.name.toLowerCase() === newName.toLowerCase()) ? 'Skill already exists' : undefined

    if (loadingSkills || loadingPeople) {
        return (
            <div className='flex justify-center h-full text-white align-bottom'>
                <ImSpinner9 className='animate-spin my-20' size='100px' />
            </div>
        )
    }

    return (
        <>
            {addingNew &&
                <Modal>
                    <div className='p-5'>
                        <h1 className='font-bold text-xl'>Add new skill</h1>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='py-4'>
                                <Label className='font-bold'>
                                    <span>
                                        Name
                                    </span>
                                    <span className='text-red-600'>
                                        {errors?.name ? '*' : ''} {errors?.name?.message}
                                    </span>
                                </Label>
                                <Input className={`mb-2 ${errors?.name ? 'border-2 border-red-600' : 'border-black'}`} {...register('name', { validate: validateName, required: true })} />
                                <Label className='font-bold'>
                                    <span>
                                        Description
                                    </span>
                                    <span className='text-red-600'>
                                        {errors?.description ? '*' : ''}
                                    </span>
                                </Label>
                                <Input className={`mb-2 ${errors?.description ? 'border-2 border-red-600' : 'border-black'}`} {...register('description', { required: true })} />
                            </div>
                            <div className='justify-between grid grid-cols-4'>
                                <Button className='font-bold' onClick={() => setAddingNew(false)}>Cancel</Button>
                                <div className='col-span-2' />
                                <Button type='submit' className='bg-green-600 font-bold'>Add</Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }
            <div className='mb-5'>
                <div className='flex items-center justify-between border-b border-black'>
                    <h1 className='text-3xl font-bold px-2 py-4 text-white'>
                        Skills
                    </h1>
                    <span className='grid grid-cols-4 gap-x-5 items-end'>
                        <span className='col-span-3 flex items-center'>
                            <Label className='font-bold text-white mr-2 text-xl'>Search</Label>
                            <Input placeholder='skill name' onChange={e => setFilter(e.target.value)} />
                        </span>
                        <Button className='bg-green-600 font-bold' onClick={() => setAddingNew(true)}>Add New</Button>
                    </span>
                </div>

                <Table className='text-white'>
                    <TableCaption>A list of your company's tracked competencies</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold w-[100px]">Skill</TableHead>
                            <TableHead className='font-bold hidden lg:table-cell '>Description</TableHead>
                            <TableHead className='font-bold'>Top Users</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedResults.map((skill) =>
                            <CollapsibleRow key={skill.id} skill={skill} people={people} />
                        )}
                    </TableBody>
                </Table>
                <Pager current={page} setPage={setPage} totalPages={Math.ceil(filteredResults.length / pageSize)} />
            </div>
        </>
    )
}

export default Skills
