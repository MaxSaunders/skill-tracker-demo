import './home.css'

const Home = () => {
    return (
        <div className='text-white'>
            <div className='mt-40 flex justify-center items-center font-bold text-5xl'>
                {/* <div className='mx-8'>
                    <img className='border-black border-1' alt='logo' src={logo} height='100px' width='100px' />
                </div> */}
                <span>
                    Welcome to
                </span>
                &nbsp;
                <span className='transition hover:text-green-600'>
                    <span className='uppercase text-green-600'>S</span>
                    <span className='uppercase text-green-600'>k</span>
                    <span className='uppercase text-green-600'>i</span>
                    <span className='uppercase text-green-600'>l</span>
                    <span className='uppercase text-green-600'>l</span>
                    <span className='uppercase'>T</span>
                    <span className='uppercase'>r</span>
                    <span className='uppercase'>a</span>
                    <span className='uppercase'>c</span>
                    <span className='uppercase'>k</span>
                    <span className='uppercase'>e</span>
                    <span className='uppercase'>r</span>
                </span>
            </div>
            <div className='mt-12 flex justify-center'>
                A website to track your team's core competencies
            </div>
        </div>
    )
}

export default Home
