import { useEffect } from 'react'
import { ImSpinner9 } from "react-icons/im";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import useGetSkills from '../Helpers/useGetSkills'
import './skills.css'

const Skills = () => {
    const { loading: loadingSkills, results: skills, fetch: fetchSkills } = useGetSkills()
    // TODO: add skill form
    // probably add react form dep
    // maybe bring make modal comp for adding new line

    useEffect(() => {
        fetchSkills()
    }, [fetchSkills])

    if (loadingSkills) {
        return (
            <div className='flex justify-center h-full text-white align-bottom'>
                <ImSpinner9 className='animate-spin my-20' size='100px' />
            </div>
        )
    }

    return (
        <>
            <h1 className='text-3xl py-4 text-white'>
                Skills
            </h1>
            <Table className='text-white'>
                <TableCaption>A list of your tracked competencies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold w-[100px]">Skill</TableHead>
                        <TableHead className='font-bold'>Description</TableHead>
                        <TableHead className='font-bold'>Users</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skills.map(({ id, name }) =>
                        <TableRow key={id}>
                            <TableCell className="font-medium">{name}</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default Skills
