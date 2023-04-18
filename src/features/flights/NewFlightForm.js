import { useState, useEffect } from "react"
import { useAddNewFlightMutation } from "./flightsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const CODE_REGEX = /^[A-z0-9 -]{3,10}$/

const NewFlightForm = () => {

  const [addNewFlight, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewFlightMutation()

  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [validCode, setValidCode] = useState(false)
  const [aircraftCode, setAircraftCode] = useState('')
  const [validAircraftCode, setValidAircraftCode] = useState(false)
  const [aircraftCrewId, setAircraftCrewId] = useState('')
  const [departureAirportCode, setDepartureAirportCode] = useState('')
  const [validDepartureAirportCode, setValidDepartureAirportCode] = useState(false)
  const [arrivalAirportCode, setArrivalAirportCode] = useState('')
  const [validArrivalAirportCode, setValidArrivalAirportCode] = useState(false)
  const [date, setDate] = useState('1970-01-01')
  const plannedBy = "test"

  useEffect(() => {
    setValidCode(CODE_REGEX.test(code))
  }, [code])

  useEffect(() => {
    setValidAircraftCode(CODE_REGEX.test(aircraftCode))
  }, [aircraftCode])

  useEffect(() => {
    setValidDepartureAirportCode(CODE_REGEX.test(departureAirportCode))
  }, [departureAirportCode])

  useEffect(() => {
    setValidArrivalAirportCode(CODE_REGEX.test(arrivalAirportCode))
  }, [arrivalAirportCode])

  useEffect(() => {
    if (isSuccess) {
        setCode('')
        setAircraftCrewId('')
        setAircraftCode('')
        setDepartureAirportCode('')
        setArrivalAirportCode('')
        setDate('')
        navigate('/home/flights')
    }
  }, [isSuccess, navigate])

  const onCodeChanged = e => setCode(e.target.value)
  const onAircraftCodeChanged = e => setAircraftCode(e.target.value)
  const onAircraftCrewIdChanged = e => setAircraftCrewId(e.target.value)
  const onDepartureAirportCodeChanged = e => setDepartureAirportCode(e.target.value)
  const onArrivalAirportCodeChanged = e => setArrivalAirportCode(e.target.value)
  const onDateChanged = e => setDate(e.target.value)

  const canSave = [validCode, validAircraftCode, validDepartureAirportCode, validArrivalAirportCode].every(Boolean) && !isLoading

  const onSaveFlightClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewFlight({ code, aircraftCrewId, departureAirportCode, arrivalAirportCode, plannedBy, date })
      }
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validCodeClass = !validCode ? 'form__input--incomplete' : ''
  const validAircraftCodeClass = !validCode ? 'form__input--incomplete' : ''
  const validDepartureAirportCodeClass = !validCode ? 'form__input--incomplete' : ''
  const validArrivalAirportCodeClass = !validCode ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveFlightClicked}>
            <div className="form__title-row">
                <h2>New flight</h2>
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

            <label className="form__label" htmlFor="code">
                    Code: <span className="nowrap">[Unique code]</span></label>
                <input
                    className={`form__input ${validCodeClass}`}
                    id="code"
                    name="code"
                    type="text"
                    autoComplete="off"
                    value={code}
                    onChange={onCodeChanged}
                />

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

            <label className="form__label" htmlFor="aircraftCrewId">
                    AircraftCrewId: <span className="nowrap">[AircraftCrew id]</span></label>
                <input
                    className={`form__input`}
                    id="aircraftCrewId"
                    name="aircraftCrewId"
                    type="text"
                    autoComplete="off"
                    value={aircraftCrewId}
                    onChange={onAircraftCrewIdChanged}
                />

            <label className="form__label" htmlFor="departureAirportCode">
                    DepartureAirportCode: <span className="nowrap">[Departure airport]</span></label>
                <input
                    className={`form__input ${validDepartureAirportCodeClass}`}
                    id="departureAirportCode"
                    name="departureAirportCode"
                    type="text"
                    autoComplete="off"
                    value={departureAirportCode}
                    onChange={onDepartureAirportCodeChanged}
                />

            <label className="form__label" htmlFor="arrivalAirportCode">
                    ArrivalAirportCode: <span className="nowrap">[Arrival airport]</span></label>
                <input
                    className={`form__input ${validArrivalAirportCodeClass}`}
                    id="arrivalAirportCode"
                    name="arrivalAirportCode"
                    type="text"
                    autoComplete="off"
                    value={arrivalAirportCode}
                    onChange={onArrivalAirportCodeChanged}
                />

            <label className="form__label" htmlFor="date">
                    Date: <span className="nowrap">[Date of flight]</span></label>
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

export default NewFlightForm