import { useState, useEffect } from "react"
import { useUpdateFlightMutation, useDeleteFlightMutation } from "./flightsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const CODE_REGEX = /^[A-z0-9 -]{3,10}$/

const EditFlightForm = ({ flight }) => {

    const [updateFlight, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateFlightMutation()

    const [deleteFlight, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteFlightMutation()

    const { id } = useAuth()

    const navigate = useNavigate()

    const [code, setCode] = useState(flight.code)
    const [validCode, setValidCode] = useState(false)
    const [aircraftCode, setAircraftCode] = useState(flight.aircraftCode)
    const [validAircraftCode, setValidAircraftCode] = useState(false)
    const [aircraftCrewId, setAircraftCrewId] = useState(flight.aircraftCrewId)
    const [departureAirportCode, setDepartureAirportCode] = useState(flight.departureAirportCode)
    const [validDepartureAirportCode, setValidDepartureAirportCode] = useState(false)
    const [arrivalAirportCode, setArrivalAirportCode] = useState(flight.arrivalAirportCode)
    const [validArrivalAirportCode, setValidArrivalAirportCode] = useState(false)
    const [date, setDate] = useState(flight.date)
    const plannedBy = id

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
        if (isSuccess || isDelSuccess) {
            setCode('')
            setAircraftCrewId('')
            setAircraftCode('')
            setDepartureAirportCode('')
            setArrivalAirportCode('')
            setDate('')
            navigate('/home/flights')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onCodeChanged = e => setCode(e.target.value)
    const onAircraftCodeChanged = e => setAircraftCode(e.target.value)
    const onAircraftCrewIdChanged = e => setAircraftCrewId(e.target.value)
    const onDepartureAirportCodeChanged = e => setDepartureAirportCode(e.target.value)
    const onArrivalAirportCodeChanged = e => setArrivalAirportCode(e.target.value)
    const onDateChanged = e => setDate(e.target.value)

    const onSaveFlightClicked = async (e) => {
        await updateFlight({ id: flight.id, code, aircraftCode, aircraftCrewId, departureAirportCode, arrivalAirportCode, plannedBy, date })
    }

    const onDeleteFlightClicked = async () => {
        await deleteFlight({ id: flight.id })
    }

    const onGoBackClicked = async () => {
        navigate('/home/flights')
    }

    let canSave = [validCode, validAircraftCode, validDepartureAirportCode, validArrivalAirportCode].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validCodeClass = !validCode ? 'form__input--incomplete' : ''
    const validAircraftCodeClass = !validCode ? 'form__input--incomplete' : ''
    const validDepartureAirportCodeClass = !validCode ? 'form__input--incomplete' : ''
    const validArrivalAirportCodeClass = !validCode ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
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
                    <h2>Edit flight</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveFlightClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteFlightClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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

    return content
}
export default EditFlightForm