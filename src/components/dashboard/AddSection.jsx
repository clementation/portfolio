import { useState } from "react"
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from "../../config/firebase" // Import your Firestore instance

import uploadImage from "../../utility/uploadImage";

import "../../styles/Upload.css"

export default function AddSection({project}) {

    const{ id, sections } = project

    // console.log(sections)
    // console.log(id)

    const [ files, setFiles ] = useState([])
    const [ title, setTitle ] = useState("")
    const [ description, setDescription] = useState("")
    const [ layout, setLayout ] = useState("image")
    const [ weight, setWeight ] = useState( sections && sections.length + 1)

    const layoutTypes = [
        "image",
        "gallery"
    ]

    async function handleSubmit(e) {
        e.preventDefault();

        let imageUrl = null

        if(layout === "gallery"){
            let urls = []
            for (const file of files) {
                console.log(file)
                const url = await uploadImage(file)
                urls.push(url)
            }
            imageUrl = urls
        }else{
            imageUrl = await uploadImage(files[0])
        }

        const sectionData = {
            title,
            imageUrl: imageUrl,
            description,
            layout,
            weight: parseInt(weight) // Convert weight to integer
        };

        try {
            // Check if sections array exists
            if (!sections) {
                // Create a new sections array with the first section object
                await updateDoc(doc(db, 'projects', id), {
                    sections: [sectionData]
                });
            } else {
                // Append the new section object to the existing sections array
                await updateDoc(doc(db, 'projects', id), {
                    sections: arrayUnion(sectionData)
                });
            }
            console.log('Section added successfully.')
            //Clear form fields after submission
            setTitle('')
            setDescription('')
            setWeight('')
        } catch (error) {
            console.error('Error adding section:', error)
        }
    }

     // Handle file selection
    function handleFileChange (e) {
        const selectedFiles = Array.from(e.target.files)
        setFiles(selectedFiles)
    };

    function verifyLayout(files, layout) {
        if(files.length > 1 && layout != "gallery"){
            return true
        }else{
            return false
        }
    }

    return(
        <div className="addSection">
            <h3>Add Section</h3>
            <form onSubmit={handleSubmit}>
                <input type="file" multiple onChange={handleFileChange} />
                <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea type="text" placeholder='Descrption' value={description} onChange={e => setDescription(e.target.value)} />
                <select type="text" value={layout} onChange={e => setLayout(e.target.value)} >
                    {layoutTypes.map((type, index) => <option key={index} value={type}>{type}</option>)}
                </select>
                <input type="text" placeholder='Weight' value={weight} onChange={e => setWeight(e.target.value)} />
                <button type="submit" disabled={verifyLayout(files, layout)}>Submit</button>
            </form>
        </div>
    )
}