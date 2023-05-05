import { useState, useEffect } from "react"
import { useAddNewMaintenanceMutation } from "./maintenancesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const CODE_REGEX = /^[A-z0-9 -]{3,10}$/

const NewMaintenanceForm = () => {

  const [addNewMaintenance, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewMaintenanceMutation()

  const { id } = useAuth()

  const navigate = useNavigate()

  const [aircraftCode, setAircraftCode] = useState('')
  const [validAircraftCode, setValidAircraftCode] = useState(false)
  const [mechanicCrewId, setMechanicCrewId] = useState('')
  const [airportCode, setAirportCode] = useState('')
  const [validAirportCode, setValidAirportCode] = useState(false)
  const [date, setDate] = useState('1970-01-01')

  useEffect(() => {
    setValidAircraftCode(CODE_REGEX.test(aircraftCode))
  }, [aircraftCode])

  useEffect(() => {
    setValidAirportCode(CODE_REGEX.test(airportCode))
  }, [airportCode])

  useEffect(() => {
    if (isSuccess) {
        setAircraftCode('')
        setAirportCode('')
        setDate('')
        navigate('/home/maintenances')
    }
  }, [isSuccess, navigate])

  const onAircraftCodeChanged = e => setAircraftCode(e.target.value)
  const onMechanicCrewIdChanged = e => setMechanicCrewId(e.target.value)
  const onAirportCodeChanged = e => setAirportCode(e.target.value)
  const onDateChanged = e => setDate(e.target.value)

  const canSave = [validAircraftCode, validAirportCode].every(Boolean) && !isLoading

  const onSaveMaintenanceClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewMaintenance({ mechanicCrewId, airportCode, aircraftCode, plannedBy: id, date, userId: id })
      }
  }

  const onGoBackClicked = async () => {
    navigate('/home/maintenances')
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validAircraftCodeClass = !validAircraftCode ? 'form__input--incomplete' : ''
  const validAirportCodeClass = !validAirportCode ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveMaintenanceClicked}>
            <div className="form__title-row">
                <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Back"
                            onClick={onGoBackClicked}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                <h2>New maintenance</h2>
                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
            </div>

            <label className="form__label" htmlFor="aircraftCode">
                    AircraftCode: <span className="nowrap">[Code of aircraft]</span></label>
                <input
                    className={`form__input ${validAircraftCodeClass}`}
                    id="aircraftCode"
                    name="aircraftCode"
                    type="text"
                    autoComplete="off"
                    value={aircraftCode}
                    onChange={onAircraftCodeChanged}
                />

                <label className="form__label" htmlFor="mechanicCrewId">
                    MechanicCrewId: <span className="nowrap">[MechanicCrew id]</span></label>
                <input
                    className={`form__input`}
                    id="mechanicCrewId"
                    name="mechanicCrewId"
                    type="text"
                    autoComplete="off"
                    value={mechanicCrewId}
                    onChange={onMechanicCrewIdChanged}
                />

                <label className="form__label" htmlFor="airportCode">
                    AirportCode: <span className="nowrap">[Airport]</span></label>
                <input
                    className={`form__input ${validAirportCodeClass}`}
                    id="airportCode"
                    name="airportCode"
                    type="text"
                    autoComplete="off"
                    value={airportCode}
                    onChange={onAirportCodeChanged}
                />

                <label className="form__label" htmlFor="date">
                    Date: <span className="nowrap">[Date of maintenance]</span></label>
                <input
                    className={`form__input`}
                    id="date"
                    name="date"
                    type="text"
                    autoComplete="off"
                    value={date}
                    onChange={onDateChanged}
                />

        </form>
    </>
  )

  return content;
}

export default NewMaintenanceForm