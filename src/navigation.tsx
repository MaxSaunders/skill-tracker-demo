import { Link } from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    // NavigationMenuContent,
    // NavigationMenuIndicator,
    // NavigationMenuTrigger,
    // NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { IoLogoChrome } from "react-icons/io5";

import { Button } from '@/components/ui/button';
import './navigation.css'
import { mockEnabled, toggleMock } from './Mock';

const Navigation = () => {
    const itemClassName = 'h-full py-2 px-10 hover:bg-blue-300 rounded hover:text-black transition duration-200'
    return (
        <NavigationMenu className='w-screen navbar font-bold text-base text-gray-300'>
            <NavigationMenuList className='w-screen flex justify-start px-24'>
                <NavigationMenuItem className='h-full py-2 px-10'>
                    <Link to='/'>
                        <NavigationMenuLink>
                            <IoLogoChrome className='text-blue-200 hover:text-white' size='30px' />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link className={itemClassName} to='/'>
                        <NavigationMenuLink>
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link className={itemClassName} to='/people'>
                        <NavigationMenuLink>
                            People
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link className={itemClassName} to='/skills'>
                        <NavigationMenuLink>
                            Skills
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link className={itemClassName} to='/my-skills'>
                        <NavigationMenuLink>
                            My Skills
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Button onClick={() => toggleMock()}>{mockEnabled ? 'Disable Mock' : 'Enable Mock'}</Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navigation
