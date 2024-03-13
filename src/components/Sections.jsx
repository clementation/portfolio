import "../styles/Sections.css"

function ImageSectionInfo({title, description}) {
    return(
        <div className="sectionInfo">
            {title !== "" && <h2>{title.toUpperCase()}</h2>}
            <p>{description}</p>
        </div>
    )
}

function ImageSection({section}){
    const {title, description, imageUrl, } = section

    return(
        <div className="section">
            <div className="sectionImage">
                <img src={imageUrl} />
            </div>
            <ImageSectionInfo title={title} description={description} />
        </div>
    )
}

function Section({section}){
    
    return(
        <ImageSection section={section} />
    )
}

export default function Sections({sections}) {


    return(
        <div className="sections">
            {sections && sections.map((section, index) => <Section section={section} key={index} />)}
        </div>
    )
}