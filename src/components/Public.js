import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">AircraftManager application!</span></h1>
            </header>
            <main className="public__main">
                <p>The best application for managing airport transportation!</p>
                <address className="public__addr">
                    <h2>This system is maintained by</h2>
                    Ivan Havran<br />
                    FMFI UK<br />
                    Slovakia<br />
                </address>
                <br />
            </main>
            <footer>
                <Link to="/login">Login into system</Link>
            </footer>
        </section>

    )
    return content
}
export default Public