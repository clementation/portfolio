import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Outlet } from "react-router-dom"

import '../styles/Frame.css'
import "../styles/Sections.css"


function HeroInfo({title, description}) {
    return(
        <div className="sectionInfo">
            <h2>{title.toUpperCase()}</h2>
            <p>{description}</p>
        </div>
    )
}

export default function Frame({ projectData, selectedProject, setSelectedProject }) {

    const {title, description, path, heroUrl, sections } = projectData

    function isOpenValue(selectedProject, path){
        if(selectedProject === '/portfolio' + path){
            return true
        }else{
            return false
        }
    }

    const[isOpen, setIsOpen] = useState(isOpenValue(selectedProject, path))

    function handleClick(){
        setSelectedProject('/portfolio' + path)
    }

    useEffect(() => {
        setIsOpen(isOpenValue(selectedProject, path))
    },[selectedProject])

    return(
        <motion.div 
            className="frame"
            layout
            onClick={handleClick}
            style={{
                gridColumn: isOpen ? "1 / -1" : "auto",
                marginTop: isOpen ? "4rem" : 0,
                paddingTop: isOpen ? "2rem" : 0,
                paddingBottom: isOpen ? "2rem" : 0,
                borderTop: isOpen ? "solid black 2px" : "none"
            }}
        >
            <div className="heroSection">
                <div className="sectionImage">
                    <img src={heroUrl}></img>
                </div>
                { isOpen && <HeroInfo title={title} description={description} /> }
            </div>
            { isOpen && <Outlet context={sections} />}
        </motion.div>
    )
}