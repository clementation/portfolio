import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useQuery } from '@tanstack/react-query'

import { db } from "../config/firebase";

import Frame from "./Frame";

import '../styles/Gallery.css'
import { useLocation, useNavigate } from "react-router-dom";

export default function Gallery() {

    const location = useLocation()
    const navigate = useNavigate()

    const [ open, setOpen ] = useState(null)
      
    const [selectedProject, setSelectedProject] = useState(location.pathname)

    useEffect(() => {
        navigate(selectedProject)
    }, [selectedProject])

    useEffect(() => {
        if(location.pathname === '/portfolio'){
            setSelectedProject(null)
        }
    }, [location])

    const querydb = "projects"

    const { isLoading, error, data } = useQuery({
        queryKey: [ querydb ],
        queryFn: async () => {
            const newData = []
            const querySnapshot = await getDocs(query(collection(db, querydb), orderBy("weight")));
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                const docWithId = { id: doc.id, ...docData }; // Include document ID in the data
                newData.push(docWithId);
            })
            return newData
        }
    })

    if(error){
        console.log(error)
    }

    return(
        <div className="grid">
            {!isLoading && data.map((data) => (
                <Frame
                    key={data.id}
                    projectData={data}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                />
            ))}
        </div>
    )
}