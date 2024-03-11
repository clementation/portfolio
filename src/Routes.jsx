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
import AddProject from './components/AddProject'
import Section from './components/Section'

export function Root({ children }) {

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export function Portfolio({ children }) {

    return (
        <Gallery />
    )
}

export function Project(){
    const params = useParams()
    const data = useOutletContext()
    console.log(params)

    return(
        <Section />
    )
}

export function About(props) {

    return(
        <div className="pagePlaceHolder">
            <h1>HEY WORLD!</h1>
            <h2>This is my About page</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet beatae, ullam soluta perferendis consequatur inventore libero non mollitia? Officia fugiat pariatur vel quibusdam eaque nihil aperiam ab ad nobis autem?</p>
            <h1>HEY WORLD!</h1>
            <h2>This is my About page</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet beatae, ullam soluta perferendis consequatur inventore libero non mollitia? Officia fugiat pariatur vel quibusdam eaque nihil aperiam ab ad nobis autem?</p>
            <h1>HEY WORLD!</h1>
            <h2>This is my About page</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet beatae, ullam soluta perferendis consequatur inventore libero non mollitia? Officia fugiat pariatur vel quibusdam eaque nihil aperiam ab ad nobis autem?</p>
            <h1>HEY WORLD!</h1>
            <h2>This is my About page</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet beatae, ullam soluta perferendis consequatur inventore libero non mollitia? Officia fugiat pariatur vel quibusdam eaque nihil aperiam ab ad nobis autem?</p>
       
        </div>
    
    )
}

export function Contact(props) {

    return(
        <div className="pagePlaceHolder">
            <h1>SUP WORLD!</h1>
            <h2>This is my Contact page</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatibus commodi beatae ratione quasi sequi excepturi atque, asperiores, expedita provident quam reiciendis, placeat ipsum mollitia in eligendi quas voluptatem qui!</p>
            <h1>SUP WORLD!</h1>
            <h2>This is my Contact page</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatibus commodi beatae ratione quasi sequi excepturi atque, asperiores, expedita provident quam reiciendis, placeat ipsum mollitia in eligendi quas voluptatem qui!</p>
            <h1>SUP WORLD!</h1>
            <h2>This is my Contact page</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatibus commodi beatae ratione quasi sequi excepturi atque, asperiores, expedita provident quam reiciendis, placeat ipsum mollitia in eligendi quas voluptatem qui!</p>
            <h1>SUP WORLD!</h1>
            <h2>This is my Contact page</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatibus commodi beatae ratione quasi sequi excepturi atque, asperiores, expedita provident quam reiciendis, placeat ipsum mollitia in eligendi quas voluptatem qui!</p>
       
        </div>
    )
}

export function Upload(){

    return(
        <AddProject />
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