import { NavLink, useLocation } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import NavToggle from "./NavToggle"

const navLinks = [
    {title: "PORTFOLIO", to: "/portfolio"},
    {title: "ABOUT", to: "/about"},
    {title: "CONTACT", to: "/contact"}
]


function Link({title, to, setIsOpen}) {
    const location = useLocation()

    function extractMainPath(path){
        const secondSlashIndex = path.indexOf('/', path.indexOf('/') + 1);
        if (secondSlashIndex !== -1) {
            return path.substring(0, secondSlashIndex);
        }
        return path;
    }

    const path = extractMainPath(location.pathname)

    function isCurrent(path) {
        if(path === to){
            return true
        }else{
            return false
        }
    }

    function handleClick() {
        setIsOpen(false)
    }

    const linkAnimation = {
        initial: {
            x: 500,
        },
        animate: {
            x: 0,
            fontWeight: isCurrent(path) ? 600 : 300,
            transition: {
                delay: 0.1,
                duration: 0.8,
                ease: "easeInOut"
            }
        },
        exit: {
            x: "-50%",
            transition: {
                delay: 0.1,
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    }

    return(
        <NavLink to={to}>
            <motion.div 
                className="link"
                layout
                onClick={handleClick}
                variants={linkAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {title}
            </motion.div>
        </NavLink>
    )
}

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    // const location = useLocation()
    // const [selectedPath, setSelectedPath] = useState(location.pathname)

    const navAnimation = {
        initial: {
            x: "100vw"
        },
        animate: {
            x: 0,
            transition: {
                duration: 0.7,
                ease: "easeInOut"
            }
        },
        exit: {
            x: "100vw",
            transition: {
                delay: 0.2,
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    }

    const toggleAnimation = {

    }

    return(
        <>
        <AnimatePresence>
            { isOpen && ( <motion.div 
                className="mobileNav"
                variants={navAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <motion.div className="links">
                    {navLinks.map((link) => <Link to={link.to} title={link.title} setIsOpen={setIsOpen} key={link.title} />)}
                </motion.div>
            </motion.div>)}
        </AnimatePresence>
            <motion.div
                className="navToggle"
                layout
                transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                }}
            >
                <NavToggle isOpen={isOpen} setIsOpen={setIsOpen} />
            </motion.div>
        </>
    )
}