import { Link } from 'react-router-dom'
import './Public.css'

const Public = () => {
  const content = (
    <section className="public">
      <header className="public-header">
        <h1>Welcome to <span className="nowrap">AircraftManager application!</span></h1>
      </header>
      <main>
        <p>This application is a comprehensive management system designed to streamline the operations of an aviation company. It allows users to manage various resources such as airports, aircraft, and crew members. With this application, users can schedule flights, assign aircraft and crews to those flights, and manage maintenance schedules to ensure that all aircraft are operating optimally. The system provides real-time status updates on flights, crew assignments, and aircraft maintenance to allow for efficient and effective decision-making. The application is designed to be user-friendly and intuitive, allowing users to easily navigate and manage all aspects of aviation operations.</p>
        <address>
          <h2>This system is maintained by</h2>
          Ivan Havran<br />
          FMFI UK<br />
          Slovakia<br />
        </address>
      </main>
      <footer className="public__footer">
        <Link to="/login" className="public__login-btn">
          Login into system
        </Link>
      </footer>
    </section>
  )
  return content
}

export default Public
