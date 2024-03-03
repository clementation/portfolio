import { useMediaQuery } from 'react-responsive'

import Logo from './Logo'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

export default function Navbar() {
    const isTablet  = useMediaQuery({ maxWidth: 768 })

    return(
        <nav>
            <Logo />
            { isTablet ? <MobileNavbar /> : <DesktopNavbar />}
        </nav>

    )
}