import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useQuery } from '@tanstack/react-query'

import '../styles/Frame.css'


const storage = getStorage()

export default function Frame({ projectData }) {

    const queryImage = projectData.heroImage

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
        <>
            {!isLoading && <img src={data}></img>}
            {/* <div className={"loadingFrame"}></div> */}
        </>
    )
}