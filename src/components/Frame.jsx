import { useState } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useQuery } from '@tanstack/react-query'
import { motion } from "framer-motion"
import { Link, Outlet, useNavigate} from "react-router-dom"

import '../styles/Frame.css'


function Title({title, description}) {
    return(
        <div className="title">
            <h2>{title.toUpperCase()}</h2>
            <p>{description}</p>
        </div>
    )
}

export default function Frame({ projectData, isOpen, toggleFrame, index }) {

    const {title, description, path, heroUrl } = projectData

    const navigate = useNavigate()

    function handleClick(){
        toggleFrame(index)
        if(isOpen === false){
            navigate(`/portfolio${path}`)
        }else(
            navigate("/portfolio")
        )

    }

    return(
        <motion.div 
            className="frame"
            layout
            onClick={handleClick}
            style={{
                gridColumn: isOpen ? "1 / -1" : "auto",
                paddingTop: isOpen ? "4rem" : 0,
                paddingBottom: isOpen ? "4rem" : 0

            }}
        >
            <div className="heroSection">
                <div className="heroImage">
                    <img src={heroUrl}></img>
                </div>
                { isOpen && <Title title={title} description={description} /> }
            </div>
            { isOpen && <Outlet context={projectData} />}
        </motion.div>
    )
}