import './home.css'

const Home = () => {
    return (
        <div className='text-white'>
            <div className='mt-32 flex justify-center font-bold text-5xl'>
                <span>
                    Welcome to
                </span>
                &nbsp;
                <span className='transition hover:text-green-600'>
                    <span className='uppercase'>S</span>
                    <span className='uppercase'>k</span>
                    <span className='uppercase'>i</span>
                    <span className='uppercase text-green-600'>l</span>
                    <span className='uppercase text-green-600'>l</span>
                    <span className='uppercase'>T</span>
                    <span className='uppercase'>r</span>
                    <span className='uppercase'>a</span>
                    <span className='uppercase'>c</span>
                    <span className='uppercase'>k</span>
                    <span className='uppercase text-green-600'>e</span>
                    <span className='uppercase text-green-600'>r</span>
                </span>
            </div>
            <div className='mt-12 flex justify-center'>
                A website to track your team's core competencies
            </div>
        </div>
    )
}

export default Home
