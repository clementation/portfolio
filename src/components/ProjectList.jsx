import { useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useQuery } from '@tanstack/react-query'

import { db } from "../config/firebase";

import AddSection from "./AddSection"

import "../styles/Upload.css"

function Item({project}) {

    const [open, setOpen] = useState(false)
    const { title, id } = project

    function handleClick(){
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    return(
        <>
            <div className="projectListItem">
                <h2>{title}</h2>
                <button onClick={handleClick} >Add Section</button>
                {open && <button onClick={handleClose}>X</button>}
            </div>
            {
                open &&
                <AddSection project={project} />
            }
        </>
    )
}

export default function ProjectList() {

    const querydb = "projects"

    const { isLoading, error, data } = useQuery({
        queryKey: [ querydb ],
        queryFn: async () => {
            const newData = []
            const querySnapshot = await getDocs(query(collection(db, querydb),orderBy("weight")));
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
        <div className="projectList">
            {!isLoading && data.map((project, index) => (
                <Item key={index} project={project} />
            ))}
        </div>
    )
}