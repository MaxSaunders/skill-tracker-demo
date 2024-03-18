import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useCallback } from "react";

interface PagerProps {
    current: number;
    size?: number;
    setPage: (page: number) => void;
    totalPages?: number;
}

const Pager: React.FC<PagerProps> = ({ current, size = 5, setPage, totalPages }) => {
    if (current == null || current == undefined) {
        throw Error("Pager component requires current value")
    }

    const first = (current < (size / 2)) ? 0 : Math.ceil(current - (size / 2))
    const pageArray = []
    for (let i = first; i < (first + size); i++) {
        if (totalPages && (i + 1) > totalPages) {
            break
        }
        pageArray.push(i)
    }

    const setPrev = useCallback(() => {
        if (current > 0) {
            setPage(current - 1)
        }
    }, [current, setPage])

    const setNext = useCallback(() => {
        if (totalPages == null || totalPages == undefined || (current + 1) < totalPages) {
            setPage(current + 1)
        }
    }, [current, setPage, totalPages])

    return (
        <Pagination className='mt-5 text-white'>
            <PaginationContent>
                <PaginationItem className='cursor-pointer' key='prev' onClick={setPrev}>
                    <PaginationPrevious />
                </PaginationItem>
                {pageArray.map(page =>
                    <PaginationItem className='cursor-pointer' key={page} onClick={() => setPage(page)}>
                        <PaginationLink className={`${(page == current) ? 'border border-input' : ''}}`}>
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem className='cursor-pointer' key='next' onClick={setNext}>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default Pager
