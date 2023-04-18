import { useState, useEffect } from "react"
import { useUpdateAircraftCrewMutation, useDeleteAircraftCrewMutation } from "./aircraftCrewsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const NAME_REGEX = /^[A-z0-9 ]{3,30}$/

const EditAircraftCrewForm = ({ aircraftCrew }) => {

    const [updateAircraftCrew, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateAircraftCrewMutation()

    const [deleteAircraftCrew, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteAircraftCrewMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(aircraftCrew.name)
    const [validName, setValidName] = useState(false)
    const [mainPilotId, setMainPilotId] = useState(aircraftCrew.mainPilotId)
    const [secondPilotId, setSecondPilotId] = useState(aircraftCrew.secondPilotId)
    const members = []

    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setName('')
            setMainPilotId('')
            setSecondPilotId('')
            navigate('/home/aircraftCrews')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onMainPilotIdChanged = e => setMainPilotId(e.target.value)
    const onSecondPilotIdChanged = e => setSecondPilotId(e.target.value)

    const onSaveAircraftCrewClicked = async (e) => {
        await updateAircraftCrew({ id: aircraftCrew.id, name, mainPilotId, secondPilotId, members })
    }

    const onDeleteAircraftCrewClicked = async () => {
        await deleteAircraftCrew({ id: aircraftCrew.id })
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
                    <h2>Edit aircraft crew</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveAircraftCrewClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteAircraftCrewClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="name">
                    Name: <span className="nowrap">[Name of aircraft crew]</span></label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="mainPilotId">
                    MainPilotId: <span className="nowrap">[]</span></label>
                <input
                    className={`form__input`}
                    id="mainPilotId"
                    name="mainPilotId"
                    type="text"
                    autoComplete="off"
                    value={mainPilotId}
                    onChange={onMainPilotIdChanged}
                />

                <label className="form__label" htmlFor="secondPilotId">
                    SecondPilotId: <span className="nowrap">[]</span></label>
                <input
                    className={`form__input`}
                    id="secondPilotId"
                    name="secondPilotId"
                    type="text"
                    autoComplete="off"
                    value={secondPilotId}
                    onChange={onSecondPilotIdChanged}
                />

            </form>
        </>
    )

    return content
}
export default EditAircraftCrewForm