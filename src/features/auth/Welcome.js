import { Link } from 'react-router-dom';
import './Welcome.css';
import useAuth from '../../hooks/useAuth';

const Welcome = () => {
  const { username } = useAuth()

  const date = new Date();
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date);

  return (
    <section className="welcome">
      <div className="welcome-header">
        <h1>Welcome {username} to our AircraftManager System</h1>
        <p>Today's date: {today}</p>
      </div>
      <div className="welcome-links">
        <Link to="/home/users" className="primary-link">
          Users
        </Link>
        <Link to="/home/flights" className="primary-link">
          Flights
        </Link>
        <div className="secondary-links">
          <Link to="/home/aircrafts">Aircrafts</Link>
          <Link to="/home/airports">Airports</Link>
          <Link to="/home/aircraftCrews">Aircraft Crews</Link>
        </div>
        <Link to="/home/maintenances" className="primary-link">
          Maintenances
        </Link>
        <div className="secondary-links">
          <Link to="/home/aircraftTypes">Aircraft Types</Link>
          {<Link to="/home/mechanicCrews">Mechanic Crews</Link>}
        </div>
      </div>
    </section>
  );
};

export default Welcome;
