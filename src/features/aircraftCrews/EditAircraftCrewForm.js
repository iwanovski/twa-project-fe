import { useState, useEffect } from "react"
import { useUpdateAircraftCrewMutation, useDeleteAircraftCrewMutation } from "./aircraftCrewsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"

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
    const [ids, setIds] = useState(aircraftCrew.memberIds);

    let prepareOptions = [];
    for (const memberId of aircraftCrew.memberIds) {
        prepareOptions.push({"label": memberId, "value": memberId})
    }
    const [options, setOptions] = useState(prepareOptions);
    const aircraftCrewId = aircraftCrew._id

    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setName('')
            setMainPilotId('')
            setSecondPilotId('')
            setIds([])
            navigate('/home/aircraftCrews')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onMainPilotIdChanged = e => setMainPilotId(e.target.value)
    const onSecondPilotIdChanged = e => setSecondPilotId(e.target.value)

    const onSaveAircraftCrewClicked = async (e) => {
        await updateAircraftCrew({ id: aircraftCrew.id, name, mainPilotId, secondPilotId, memberIds: ids })
    }

    const onDeleteAircraftCrewClicked = async () => {
        await deleteAircraftCrew({ id: aircraftCrew.id })
    }

    const onGoBackClicked = async () => {
        navigate('/home/aircraftCrews')
    }

    const onMemberIdsChange = async (selectedOptions) => {
        const selectedIds = selectedOptions.map((option) => option.value);
        setIds(selectedIds);
    }
    
    const handleAddId = async () => {
        const newId = prompt('Enter new ID:');
        if (newId && !options.some((option) => option.value === newId)) {
            setOptions([...options, { value: newId, label: newId }]);
        }
    }
    
    const handleRemoveId = async () => {
        const confirmed = window.confirm('Are you sure you want to remove the selected IDs?');
        if (confirmed) {
          const remainingOptions = options.filter((option) => !ids.includes(option.value));
          setOptions(remainingOptions);
          setIds([]);
        }
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

                <label className="form__label" htmlFor="id">
                    Id: <span className="nowrap"></span></label>
                <input
                    className={`form__input`}
                    id="aircraftCrewId"
                    name="aircraftCrewId"
                    type="text"
                    autoComplete="off"
                    value={aircraftCrewId}
                    readOnly
                    style={{ backgroundColor: '#dcdcdc', cursor: 'not-allowed' }}
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

                <label className="form__label" htmlFor="ids">
                    IDs:
                </label>
                <Select
                    id="memberIds"
                    name="memberIds"
                    options={options}
                    isMulti
                    value={options.filter((option) => ids.includes(option.value))}
                    onChange={onMemberIdsChange}
                />
                <div>
                    <button onClick={handleAddId}>Add ID</button>
                    <button onClick={handleRemoveId}>Remove Selected IDs</button>
                </div>
            </form>
        </>
    )

    return content
}
export default EditAircraftCrewForm