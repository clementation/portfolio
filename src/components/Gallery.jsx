import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from '@tanstack/react-query'

import { db } from "../config/firebase";

import Frame from "./Frame";

import '../styles/Gallery.css'

export default function Gallery() {
    
    const querydb = "projects"

    const { isLoading, error, data } = useQuery({
        queryKey: [ querydb ],
        queryFn: async () => {
            const newData = []
            const querySnapshot = await getDocs(collection(db, querydb));
            querySnapshot.forEach((doc) => {
                newData.push(doc.data())
            })
            return newData
        }
    })

    if(error){
        console.log(error)
    }

    return(
        <div className="grid">
            {!isLoading && data.map((data, index) => (
                <Frame projectData={data} key={index} />
            ))}
        </div>
    )
}