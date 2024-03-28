import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { useQuery } from '@tanstack/react-query'
import { Reorder, useDragControls } from "framer-motion";

import { db } from "../../config/firebase";

import AddSection from "./AddSection"
import AddProject from "./AddProject";
import { DragPad } from "./DragPad";

import "../../styles/Upload.css"

function Section({section}) {

    const { imageUrl, layout } = section

    const [ title, setTitle ] = useState(() => (section.title ? section.title : ""))
    const [ description, setDescription ] = useState(() => (section.description ? section.description : ""))
    

    function getFirstImage(imageUrl){
        if(layout === "gallery"){
            return imageUrl[0]
        }else{
            return imageUrl
        }
    }

    function handleSubmit(){

    }

    return(
        <div className="projectSection">
            <div className="projectListImage">
                <img src={getFirstImage(imageUrl)} />
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={e => setTitle(e.value)} />
                <textarea type="text" value={description} onChange={e => setDescription(e.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

function Item({project}) {

    const [open, setOpen] = useState(false)
    const {heroUrl, title, id, sections } = project

    // const dragControls = useDragControls()

    function handleClick(){
        setOpen(prev => !prev)
    }

    return(
        <Reorder.Item
            key={id} 
            value={project} 
            // dragListener={false} 
            // dragControls={dragControls}
        >
            <div className="projectListItem">
                <div className="projectListImage">
                    <img src={heroUrl} />
                </div>
                <h3>{title}</h3>
                <button onClick={handleClick} >{ open? "^" : "=" }</button>
                {/* <DragPad dragControls={dragControls} /> */}
                <DragPad height={"35%"} />
            </div>
            {open &&
                sections.map((section, i) => (
                    <Section key={i} section={section} />
                ))
            //  <AddSection project={project} />
            }
        </Reorder.Item>
    )
}

export default function ProjectList() {

    const [ projects, setProjects ] = useState(null)
    const [ addProjectOpen, setAddProjectOpen ] = useState(false)

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
            setProjects(newData)
            return newData
        }
    })

    if(error){
        console.log(error)
    }

    function handleReorder(newOrder) {
        setProjects(newOrder);
    };

    function handleAddProjectOpen (){
        setAddProjectOpen(prev => !prev)
    }

    async function saveOrder(){
        for (const [index, project] of projects.entries()) {
            const newWeight = index + 1
            const projectRef = doc(db, "projects", project.id);
            try {
                await updateDoc(projectRef, {
                    weight: newWeight
                });
                console.log("Document successfully updated!");
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
    }

    return(
        <div className="projectList" >
            <button onClick={saveOrder}>Save Order</button>
            {!isLoading && projects && (
                <>
                    <Reorder.Group 
                        axis="y" 
                        values={projects} 
                        onReorder={handleReorder}
                    >
                        {projects.map((project) => (
                            <Item key={project.id} project={project} />
                        ))}
                    </Reorder.Group>
                    <div className="projecListItem">
                            {!addProjectOpen && <button onClick={handleAddProjectOpen}>Add Project</button>}
                            {addProjectOpen && <AddProject projectCount={projects.length} toggleVisable={handleAddProjectOpen} />}
                    </div>
                </>
            )}
        </div>
    )
}