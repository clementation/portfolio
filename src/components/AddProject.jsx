import { useState } from 'react'
import {
    getStorage,
    ref, 
    getDownloadURL, 
    uploadBytesResumable
} from "firebase/storage"
import {
    getFirestore,
    collection,
    addDoc
} from 'firebase/firestore'

import "../styles/Upload.css"

export default function AddProject() {
    const [ files, setFiles ] = useState(null)
    const [ title, setTitle ] = useState("")
    const [ description, setDescription] = useState("")
    const [ weight, setWeight ] = useState("")
    // const [ path, setPath ] = useState("")

    //chat GPT
    function prepareUrl(inputString) {
        // Convert capital letters to lowercase and remove spaces using regular expressions
        return inputString.replace(/[A-Z ]/g, (match) => match.toLowerCase().replace(/\s/g, ''));
    }

    //chat GPT
    async function uploadImage(file) {
        // Get a reference to the storage service
        const storage = getStorage();
        const storageRef = ref(storage, file.name); // Reference to the image file in the storage

        // Upload the file
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Wait for the upload to complete and return the download URL
        try {
            await uploadTask;
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File uploaded successfully. Download URL:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error; // Propagate the error
        }
    }

    //chat GPT
    async function createDocument(collectionName, documentData) {
        try {
            // Get a Firestore instance
            const db = getFirestore();
    
            // Add a new document with a generated ID to the specified collection
            const docRef = await addDoc(collection(db, collectionName), documentData);
    
            console.log("Document written with ID: ", docRef.id);
            return docRef.id; // Return the ID of the newly created document
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error; // Propagate the error
        }
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        const path = `/${prepareUrl(title)}`
        try{
            const imageUrl = await uploadImage(files[0])
    
            console.log(imageUrl)
            
            const projactData = {
                title: title,
                description: description,
                path: path,
                heroUrl: imageUrl,
                weight: parseInt(weight, 10)
            }
            createDocument("projects", projactData).then(docId => {
                console.log("Document ID:", docId);
            })
        } catch(error) {
            console.error("Error:", error);
        }
    }

    return(
        <div className="addProject">
            <h1>Add Project</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={e => setFiles(e.target.files)} />
                <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea type="text" placeholder='Descrption' value={description} onChange={e => setDescription(e.target.value)} />
                <input type="text" placeholder='Weight' value={weight} onChange={e => setWeight(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}