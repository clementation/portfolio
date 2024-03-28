
import "../styles/Sections.css"

function SectionInfo({title, description}) {
    // console.log(title)
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
            {(title || description) && <SectionInfo title={title} description={description} />}
        </div>
    )
}

function GalleryItem({imageUrl}) {
    return(
        <div className="galleryItem">
            <img src={imageUrl} />
        </div>
    )
}

function GallerySection({section}) {
    const {title, description, imageUrl } = section
    
    return(
        <div className="verticalSection">
            {(title || description) && <SectionInfo title={title} description={description} />}
            <div className="sectionGrid">
                {imageUrl.map((imageUrl, index) => <GalleryItem key={index} imageUrl={imageUrl}/>)}
            </div>
        </div>
    )
}

function Section({section}){

    function selectSection(section){

        switch(section.layout){
            case "image":
                return <ImageSection section={section} />
            case "gallery":
                return <GallerySection section={section} />
        }
    }

    const selectedSection = selectSection(section)
    
    return(
        <>
            {selectedSection}
        </>
    )
}

export default function Sections({sections}) {


    return(
        <div className="sections">
            {sections && sections.map((section, index) => <Section section={section} key={index} />)}
        </div>
    )
}