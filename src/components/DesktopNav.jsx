import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import NavElement from './NavElement'

export default function DesktopNav(){
    const location = useLocation()
    const [selectedPath, setSelectedPath] = useState(location.pathname)
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setSelectedPath(location.pathname)
    },[location])

    return(
        
        <motion.div className="desktopNav"
            initial={{x: "110%" }}
            animate={{x: 0}}
            transition={{
                duration: 1.2, 
                delay: 0.3,
                ease: "easeInOut"
            }}
        >
            <NavElement to={"/"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >PORTFOLIO</NavElement>
            <NavElement to={"/about"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >ABOUT</NavElement>
            <NavElement to={"/contact"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >CONTACT</NavElement>
        </motion.div>
    )
}

