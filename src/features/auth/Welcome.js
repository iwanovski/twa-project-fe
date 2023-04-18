import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>Today's date: {today}</p>

            <p><Link to="/home/users">User Settings</Link></p>

            <p><Link to="/home/aircraftTypes">Aircraft Types</Link></p>

            <p><Link to="/home/aircrafts">Aircrafts</Link></p>

            <p><Link to="/home/airports">Airports</Link></p>

            <p><Link to = "/home/aircraftCrews">Aircraft crews</Link></p>

            <p><Link to = "/home/mechanicCrews">Mechanic crews</Link></p>

            <p><Link to = "/home/flights">Scheduled flights</Link></p>

            <p><Link to = "/home/maintenances">Scheduled maintenances</Link></p>

        </section>
    )

    return content
}
export default Welcome