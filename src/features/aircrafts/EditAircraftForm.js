import { useState, useEffect } from "react"
import { useUpdateAircraftMutation, useDeleteAircraftMutation } from "./aircraftsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

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

    const [code, setCode] = useState(aircraft.code)
    const [validCode, setValidCode] = useState(false)
    const [aircraftTypeCode, setAircraftTypeCode] = useState(aircraft.aircraftTypeCode)
    const [validAircraftTypeCode, setValidAircraftTypeCode] = useState(false)
    const [homeAirportCode, setHomeAirportCode] = useState(aircraft.homeAirportCode)
    const [validHomeAirportCode, setValidHomeAirportCode] = useState(false)


    useEffect(() => {
        setValidCode(CODE_REGEX.test(code))
    }, [code])

    useEffect(() => {
        setValidAircraftTypeCode(CODE_REGEX.test(aircraftTypeCode))
    }, [aircraftTypeCode])

    useEffect(() => {
        setValidHomeAirportCode(AIRPORT_CODE_REGEX.test(homeAirportCode))
    }, [homeAirportCode])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setCode('')
            setAircraftTypeCode('')
            setHomeAirportCode('')
            navigate('/home/aircrafts')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onCodeChanged = e => setCode(e.target.value)
    const onAircraftTypeCodeChanged = e => setAircraftTypeCode(e.target.value)
    const onHomeAirportCodeChanged = e => setHomeAirportCode(e.target.value)

    const onSaveAircraftClicked = async (e) => {
        await updateAircraftType({ id: aircraft.id, code, aircraftTypeCode, homeAirportCode })
    }

    const onDeleteAircraftClicked = async () => {
        await deleteAircraftType({ id: aircraft.id })
    }

    let canSave = [validCode, validAircraftTypeCode, validHomeAirportCode].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validCodeClass = !validCode ? 'form__input--incomplete' : ''
    const validAircraftTypeCodeClass = !validCode ? 'form__input--incomplete' : ''
    const validHomeAirportCodeClass = !validCode ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
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
                    className={`form__input ${validCodeClass}`}
                    id="code"
                    name="code"
                    type="text"
                    autoComplete="off"
                    value={code}
                    onChange={onCodeChanged}
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

            </form>
        </>
    )

    return content
}
export default EditAircraftForm