import { useState } from "react"
import "../styles/Upload.css"

export default function AddSection({project}) {

    const{ sections } = project

    console.log(sections)

    const [ files, setFiles ] = useState(null)
    const [ title, setTitle ] = useState("")
    const [ description, setDescription] = useState("")
    const [ layout, setLayout ] = useState("")
    const [ weight, setWeight ] = useState("")

    function handleSubmit() {

    }

    return(
        <div className="addSection">
            <h3>Add Section</h3>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={e => setFiles(e.target.files)} />
                <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea type="text" placeholder='Descrption' value={description} onChange={e => setDescription(e.target.value)} />
                <input type="text" placeholder='Layout' value={weight} onChange={e => setLayout(e.target.value)} />
                <input type="text" placeholder='Weight' value={weight} onChange={e => setWeight(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}