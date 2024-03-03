import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import NavCluster from './NavCluster'
import Cluster from './Cluster'
import Logo from './Logo'

export default function DesktopNavbar(){
    const location = useLocation()
    const [selectedPath, setSelectedPath] = useState(location.pathname)

    useEffect(() => {
        setSelectedPath(location.pathname)
    },[location])

    return(
        <nav>
            <Logo />
            <motion.div className="navPuzzle"
                initial={{x: "110%" }}
                animate={{x: 0}}
                transition={{
                    duration: 1.2, 
                    delay: 0.3,
                    ease: "easeInOut"
                }}
            >
                <NavCluster to={"/"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >PORTFOLIO</NavCluster>
                <NavCluster to={"/about"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >ABOUT</NavCluster>
                <NavCluster to={"/contact"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >CONTACT</NavCluster>
                <Cluster />
            </motion.div>
        </nav>
        
    )
}

