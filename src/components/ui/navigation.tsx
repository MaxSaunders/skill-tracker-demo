import { Link, useLocation } from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from '@/components/ui/navigation-menu'

import { Button } from '@/components/ui/button';
import { mockEnabled, toggleMock } from '../../Mock';
import './navigation.css'

interface NavItemProps {
    label: string,
    to: string,
    pathName: string,
    className: string,
    activeClassName: string,
}

const NavItem: React.FC<NavItemProps> = ({ label, to, pathName, className, activeClassName }) =>
    <NavigationMenuItem className='h-full navbar-pad flex min-w-max'>
        <Link className={`${className} ${to === pathName ? activeClassName : ''}`} to={to}>
            {label}
        </Link>
    </NavigationMenuItem>

const Navigation = () => {
    const { pathname } = useLocation()
    const itemClassName = 'px-10 text-xl hover:border-b border-green-600 hover:text-green-600 transition duration-200'
    const activeClassName = 'text-green-600 border-b'
    return (
        <NavigationMenu className='w-screen sticky -top-0 navbar font-bold text-base text-gray-300'>
            <NavigationMenuList className='w-screen justify-start h-12'>
                <NavigationMenuItem className='h-full py-2 px-10 items-center flex'>
                    <Link to='/' className='h-full flex text-xl'>
                        {/* <div className='hover:text-transparent'>
                            <span className='uppercase text-green-600'>S</span>
                            <span className='uppercase'>k</span>
                            <span className='uppercase'>i</span>
                            <span className='uppercase'>l</span>
                            <span className='uppercase'>l</span>
                            <span className='uppercase text-green-600'>T</span>
                            <span className='uppercase'>r</span>
                            <span className='uppercase text-green-600'>a</span>
                            <span className='uppercase text-green-600'>c</span>
                            <span className='uppercase text-green-600'>k</span>
                            <span className='uppercase'>e</span>
                            <span className='uppercase'>r</span>
                        </div> */}
                        {/* <div className='h-full items-center flex transition hover:text-green-600'>
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
                        </div> */}
                        <div className='h-full items-center flex transition hover:text-green-600'>
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
                        </div>
                    </Link>
                </NavigationMenuItem>
                <NavItem label='Home' to='/' pathName={pathname} className={itemClassName} activeClassName={activeClassName} />
                <NavItem label='People' to='/people' pathName={pathname} className={itemClassName} activeClassName={activeClassName} />
                <NavItem label='Skills' to='/skills' pathName={pathname} className={itemClassName} activeClassName={activeClassName} />
                <NavItem label='My Skills' to='/my-skills' pathName={pathname} className={itemClassName} activeClassName={activeClassName} />
                <NavigationMenuItem className='w-full' />
                <NavigationMenuItem className='flex py-1 pr-5'>
                    <Button onClick={() => toggleMock()}>{mockEnabled ? 'Disable Mock' : 'Enable Mock'}</Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navigation
