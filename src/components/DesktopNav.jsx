import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import NavElement from './NavElement'

export default function DesktopNav(){
    const location = useLocation()

    function extractMainPath(path){
        const secondSlashIndex = path.indexOf('/', path.indexOf('/') + 1);
        if (secondSlashIndex !== -1) {
            return path.substring(0, secondSlashIndex);
        }
        return path;
    }

    const path = extractMainPath(location.pathname)

    const [selectedPath, setSelectedPath] = useState(path)

    useEffect(() => {
        setSelectedPath(path)
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
            <NavElement to={"/portfolio"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >PORTFOLIO</NavElement>
            <NavElement to={"/about"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >ABOUT</NavElement>
            <NavElement to={"/contact"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >CONTACT</NavElement>
        </motion.div>
    )
}

