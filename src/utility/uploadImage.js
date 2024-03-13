import {
    getStorage,
    ref, 
    getDownloadURL, 
    uploadBytesResumable
} from "firebase/storage"

export default async function uploadImage(file) {
    // Get a reference to the storage service
    const storage = getStorage()
    const storageRef = ref(storage, file.name) // Reference to the image file in the storage

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file)

    // Wait for the upload to complete and return the download URL
    try {
        await uploadTask
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File uploaded successfully. Download URL:', downloadURL)
        return downloadURL
    } catch (error) {
        console.error("Error uploading file:", error)
        throw error; // Propagate the error
    }
}