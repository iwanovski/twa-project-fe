import { useState, useEffect } from "react"
import { useUpdateMaintenanceMutation, useDeleteMaintenanceMutation } from "./maintenancesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const CODE_REGEX = /^[A-z0-9 -]{3,10}$/

const EditMaintenanceForm = ({ maintenance }) => {

    const [updateMaintenance, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateMaintenanceMutation()

    const [deleteMaintenance, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteMaintenanceMutation()

    const navigate = useNavigate()

    const [aircraftCode, setAircraftCode] = useState(maintenance.aircraftCode)
    const [validAircraftCode, setValidAircraftCode] = useState(false)
    const [mechanicCrewId, setMechanicCrewId] = useState(maintenance.mechanicCrewId)
    const [airportCode, setAirportCode] = useState(maintenance.airportCode)
    const [validAirportCode, setValidAirportCode] = useState(false)
    const [date, setDate] = useState(maintenance.date)
    const plannedBy = "test"

    useEffect(() => {
        setValidAircraftCode(CODE_REGEX.test(aircraftCode))
    }, [aircraftCode])

    useEffect(() => {
        setValidAirportCode(CODE_REGEX.test(airportCode))
    }, [airportCode])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setMechanicCrewId('')
            setAircraftCode('')
            setAirportCode('')
            setDate('')
            navigate('/home/maintenances')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onAircraftCodeChanged = e => setAircraftCode(e.target.value)
    const onMechanicCrewIdChanged = e => setMechanicCrewId(e.target.value)
    const onAirportCodeChanged = e => setAirportCode(e.target.value)
    const onDateChanged = e => setDate(e.target.value)

    const onSaveMaintenanceClicked = async (e) => {
        await updateMaintenance({ id: maintenance.id, mechanicCrewId, airportCode, plannedBy, date })
    }

    const onDeleteMaintenanceClicked = async () => {
        await deleteMaintenance({ id: maintenance.id })
    }

    const onGoBackClicked = async () => {
        navigate('/home/maintenances')
    }

    let canSave = [validAircraftCode, validAirportCode].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validAircraftCodeClass = !validAircraftCode ? 'form__input--incomplete' : ''
    const validAirportCodeClass = !validAirportCode ? 'form__input--incomplete' : ''

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
                    <h2>Edit maintenance</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveMaintenanceClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteMaintenanceClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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

    return content
}
export default EditMaintenanceForm