import { useMediaQuery } from 'react-responsive'

import Logo from './Logo'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Navbar() {
    const isTablet  = useMediaQuery({ maxWidth: 768 })

    return(
        <nav>
            <Logo />
            { isTablet ? <MobileNav /> : <DesktopNav />}
        </nav>

    )
}