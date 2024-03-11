import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useQuery } from '@tanstack/react-query'

import { db } from "../config/firebase";

import Frame from "./Frame";

import '../styles/Gallery.css'

export default function Gallery() {
    
    const querydb = "projects"

    const [open, setOpen] = useState(null)

    function toggleFrame(index){
        setOpen(open === index ? null : index)
    }

    const { isLoading, error, data } = useQuery({
        queryKey: [ querydb ],
        queryFn: async () => {
            const newData = []
            const querySnapshot = await getDocs(query(collection(db, querydb),orderBy("weight")));
            querySnapshot.forEach((doc) => {
                newData.push(doc.data())
            })
            return newData
        }
    })

    if(error){
        console.log(error)
    }

    console.log(data)

    return(
        <div className="grid">
            {!isLoading && data.map((data, index) => (
                <Frame
                    key={index}
                    index={index}
                    projectData={data}
                    isOpen={open === index}
                    toggleFrame={toggleFrame}
                />
            ))}
        </div>
    )
}