import {
    Link,
    NavLink,
    Outlet,
    useOutlet,
    useParams,
    useSearchParams,
    useLocation,
    useRouteError,
    useOutletContext
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import Sections from './components/Sections'
import Footer from './components/Footer'

//dashboard
import ProjectList from './components/dashboard/ProjectList'

import takeaway from './images/takeaway.png'

export function Root({ children }) {

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    )
}

export function Portfolio({ children }) {

    return (
        <Gallery />
    )
}

export function Project(){
    
    const sections = useOutletContext()

    return(
        <Sections sections={sections} />
    )
}

export function About(props) {

    return(
        <div className="aboutTemp">
            <h1>Hello!</h1>
            <p>My name is Connor! I'm a graphic designerer with a minor in computer science studying at Oregon State University.</p>
        </div>

    )
}

const ButtonMailto = ({ mailto, label }) => {
    return (
        <Link
            to='#'
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >
            <h1>{label}</h1>
        </Link>
    );
};

// export default ButtonMailto;

export function Contact(props) {

    return(
        <div className="contact">
            <div className="contactInfo">
                <ButtonMailto label="CREATIONS@CONNORKEALEY.DESIGN" mailto="mailto:creations@connorkealey.design" />
                <h2>971-238-6140</h2>
            </div>
            <div className="contactImage">
                <img src={takeaway} alt="my takeaway" />
            </div>
        </div>
    )
}

export function Upload(){

    return(
        <>
            <h1>To Do</h1>
            <ul>
                <li>Add project information</li>
                <li>Rework about page</li>
                <li>Fix navbar jump</li>
                <li>Improve dashboard</li>
                <li>Add auth and dashboard access</li>
                <li>Add paralax background</li>
            </ul>
            <ProjectList />
        </>
    )
}

export function ErrorPage() {
    const error = useRouteError()
    console.error(error)
    return (
        <>
            <h1>Error</h1>
            <p>{error.statusText || error.message}</p>
        </>
    )
}