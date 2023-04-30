import { useState, useEffect } from "react"
import { useUpdateMechanicCrewMutation, useDeleteMechanicCrewMutation } from "./mechanicCrewsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const NAME_REGEX = /^[A-z0-9 ]{3,30}$/

const EditMechanicCrewForm = ({ mechanicCrew }) => {

    const [updateMechanicCrew, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateMechanicCrewMutation()

    const [deleteMechanicCrew, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteMechanicCrewMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(mechanicCrew.name)
    const [validName, setValidName] = useState(false)
    const [homeAirportCode, setHomeAirportCode] = useState(mechanicCrew.homeAirportCode)
    const aircraftTypeCodes = []
    const members = []

    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setName('')
            setHomeAirportCode('')
            navigate('/home/mechanicCrews')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onHomeAirportCodeChanged = e => setHomeAirportCode(e.target.value)

    const onSaveMechanicCrewClicked = async (e) => {
        await updateMechanicCrew({ id: mechanicCrew.id, name, homeAirportCode, aircraftTypeCodes, members })
    }

    const onDeleteMechanicCrewClicked = async () => {
        await deleteMechanicCrew({ id: mechanicCrew.id })
    }

    const onGoBackClicked = async () => {
        navigate('/home/mechanicCrews')
    }

    let canSave = [validName].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validNameClass = !validName ? 'form__input--incomplete' : ''

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
                    <h2>Edit mechanic crew</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveMechanicCrewClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteMechanicCrewClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="name">
                    Name: <span className="nowrap">[Name of mechanic crew]</span></label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="homeAirportCode">
                    HomeAirportCode: <span className="nowrap"></span></label>
                <input
                    className={`form__input`}
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
export default EditMechanicCrewForm