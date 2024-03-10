import { useState } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useQuery } from '@tanstack/react-query'
import { motion } from "framer-motion"
import { Link, Outlet, useNavigate} from "react-router-dom"

import '../styles/Frame.css'


const storage = getStorage()

export default function Frame({ projectData }) {

    const {title, path } = projectData

    const navigate = useNavigate()

    const queryImage = projectData.heroImage

    const [open, setOpen] = useState(false)

    function handleClick(){
        setOpen(prev => !prev)
        navigate(`/portfolio${path}`)
    }

    const { isLoading, error, data } = useQuery({
        queryKey: [ queryImage ],
        queryFn: async () => {
            const storageRef = ref(storage, queryImage);
            const imageURL = await getDownloadURL(storageRef);
            return imageURL
        }
    })

    if(error){
        console.log(error)
    }

    return(
        <motion.div 
            className="frame"
            layout
            onClick={handleClick}
            style={{
                gridColumn: open ? "1 / -1" : "auto"
            }}
        >
            <img src={data}></img>
            { open && <Outlet context={projectData} />}
        </motion.div>
    )
}