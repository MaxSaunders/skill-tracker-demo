import { FaStar } from "react-icons/fa"

interface ColorHash {
    [index: number]: string
}

const colors: ColorHash = {
    0: 'text-white',
    1: 'text-red-700',
    2: 'text-orange',
    3: 'text-yellow-300',
    4: 'text-green-600',
}

interface StarRatingProps {
    rating: number,
    showAll?: boolean
}

const StarRating: React.FC<StarRatingProps> = ({ rating, showAll = true }) => {
    const countArray = [...Array(rating)]
    const color = colors[rating]

    if (showAll) {
        return (
            <span className='flex'>
                <span className={`mr-1 ${rating >= 1 ? color : 'text-white'}`}>
                    <FaStar size='1.3rem' />
                </span>
                <span className={`mr-1 ${rating >= 2 ? color : 'text-white'}`}>
                    <FaStar size='1.3rem' />
                </span>
                <span className={`mr-1 ${rating >= 3 ? color : 'text-white'}`}>
                    <FaStar size='1.3rem' />
                </span>
                <span className={`mr-1 ${rating >= 4 ? color : 'text-white'}`}>
                    <FaStar size='1.3rem' />
                </span>
            </span>
        )
    }

    return (
        <span className={`flex ${color}`}>
            {countArray.map((_, index) =>
                <FaStar key={index} />
            )}
        </span>
    )
}

export default StarRating
