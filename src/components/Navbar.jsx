import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Navbar() {
    const isTablet = useMediaQuery({ maxWidth: 768 });
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("up"); // Track scroll direction

    const threshold = 100; // Adjust the threshold as needed

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrolledUp = currentScrollPos < prevScrollPos;
            const distanceFromTop = currentScrollPos;

            // Update scroll direction
            setScrollDirection(isScrolledUp ? "up" : "down");

            // Show navbar if at top of page or scrolling up
            setIsVisible(distanceFromTop < threshold || isScrolledUp);

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -110 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <Logo />
            {isTablet ? <MobileNav /> : <DesktopNav />}
        </motion.nav>
    );
}







