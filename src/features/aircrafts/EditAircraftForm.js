import { useState, useEffect } from "react"
import { useUpdateAircraftMutation, useDeleteAircraftMutation } from "./aircraftsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const CODE_REGEX = /^[A-z0-9 -]{3,10}$/
const AIRPORT_CODE_REGEX = /^[A-z0-9 -]{3,5}$/

const EditAircraftForm = ({ aircraft }) => {

    const [updateAircraftType, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateAircraftMutation()

    const [deleteAircraftType, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteAircraftMutation()

    const navigate = useNavigate()

    const { id } = useAuth()

    const code = aircraft.code
    const [aircraftTypeCode, setAircraftTypeCode] = useState(aircraft.aircraftTypeCode)
    const [validAircraftTypeCode, setValidAircraftTypeCode] = useState(false)
    const [homeAirportCode, setHomeAirportCode] = useState(aircraft.homeAirportCode)
    const [validHomeAirportCode, setValidHomeAirportCode] = useState(false)
    const [maintainerId, setMaintainerId] = useState(aircraft.maintainerId)


    useEffect(() => {
        setValidAircraftTypeCode(CODE_REGEX.test(aircraftTypeCode))
    }, [aircraftTypeCode])

    useEffect(() => {
        setValidHomeAirportCode(AIRPORT_CODE_REGEX.test(homeAirportCode))
    }, [homeAirportCode])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setAircraftTypeCode('')
            setHomeAirportCode('')
            setMaintainerId('')
            navigate('/home/aircrafts')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onAircraftTypeCodeChanged = e => setAircraftTypeCode(e.target.value)
    const onHomeAirportCodeChanged = e => setHomeAirportCode(e.target.value)
    const onMaintainerIdChanged = e => setMaintainerId(e.target.value)

    const onSaveAircraftClicked = async (e) => {
        await updateAircraftType({ id: aircraft.id, aircraftTypeCode, homeAirportCode, maintainerId, userId: id })
    }

    const onDeleteAircraftClicked = async () => {
        await deleteAircraftType({ id: aircraft.id })
    }

    const onGoBackClicked = async () => {
        navigate('/home/aircrafts')
    }

    let canSave = [validAircraftTypeCode, validHomeAirportCode].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validAircraftTypeCodeClass = !validAircraftTypeCode ? 'form__input--incomplete' : ''
    const validHomeAirportCodeClass = !validHomeAirportCode ? 'form__input--incomplete' : ''

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
                    <h2>Edit aircraft</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveAircraftClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteAircraftClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="code">
                    Code: <span className="nowrap">[Unique code]</span></label>
                <input
                    className={`form__input`}
                    id="code"
                    name="code"
                    type="text"
                    autoComplete="off"
                    readOnly
                    style={{ backgroundColor: '#dcdcdc', cursor: 'not-allowed' }}
                    value={code}
                />

                <label className="form__label" htmlFor="aircraftTypeCode">
                    AircraftType code: <span className="nowrap">[Code of aircraft Type]</span></label>
                <input
                    className={`form__input ${validAircraftTypeCodeClass}`}
                    id="aircraftTypeCode"
                    name="aircraftTypeCode"
                    type="text"
                    autoComplete="off"
                    value={aircraftTypeCode}
                    onChange={onAircraftTypeCodeChanged}
                />

                <label className="form__label" htmlFor="homeAirportCode">
                    Home airport code: <span className="nowrap">[Home airport]</span></label>
                <input
                    className={`form__input ${validHomeAirportCodeClass}`}
                    id="homeAirportCode"
                    name="homeAirportCode"
                    type="text"
                    autoComplete="off"
                    value={homeAirportCode}
                    onChange={onHomeAirportCodeChanged}
                />

                <label className="form__label" htmlFor="maintainerId">
                  MaintainerId: <span className="nowrap"></span></label>
                <input
                    className={`form__input`}
                    id="maintainerId"
                    name="maintainerId"
                    type="text"
                    autoComplete="off"
                    value={maintainerId}
                    onChange={onMaintainerIdChanged}
                />

            </form>
        </>
    )

    return content
}
export default EditAircraftForm