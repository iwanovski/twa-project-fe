import { useState, useEffect } from "react"
import { useUpdateAirportMutation, useDeleteAirportMutation } from "./airportsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"
import useAuth from "../../hooks/useAuth"

const NAME_REGEX = /^[A-z0-9 ]{3,30}$/
const CODE_REGEX = /^[A-z0-9 -]{3,10}$/

const EditAirportForm = ({ airport }) => {

    const [updateAirport, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateAirportMutation()

    const [deleteAirport, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteAirportMutation()

    const navigate = useNavigate()

    const { id } = useAuth()

    const [fullName, setFullName] = useState(airport.fullName)
    const [validFullName, setValidFullName] = useState(false)
    const [code, setCode] = useState(airport.code)
    const [validCode, setValidCode] = useState(false)
    const [address, setAddress] = useState(airport.address)
    const [managerId, setManagerId] = useState(airport.managerId)
    const [plannerIds, setPlannerIds] = useState(airport.plannerIds);

    let prepareOptions = [];
    for (const plannerId of airport.plannerIds) {
        prepareOptions.push({"label": plannerId, "value": plannerId})
    }
    const [options, setOptions] = useState(prepareOptions);

    useEffect(() => {
        setValidFullName(NAME_REGEX.test(fullName))
    }, [fullName])

    useEffect(() => {
        setValidCode(CODE_REGEX.test(code))
    }, [code])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setFullName('')
            setCode('')
            setAddress('')
            setManagerId('')
            setPlannerIds([])
            navigate('/home/airports')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onFullNameChanged = e => setFullName(e.target.value)
    const onCodeChanged = e => setCode(e.target.value)
    const onAddressChanged = e => setAddress(e.target.value)
    const onManagerIdChanged = e => setManagerId(e.target.value)

    const onSaveAirportClicked = async (e) => {
        await updateAirport({ id: airport.id, fullName, address, managerId, plannerIds, userId: id })
    }

    const onDeleteAirportClicked = async () => {
        await deleteAirport({ id: airport.id })
    }

    const onGoBackClicked = async () => {
        navigate('/home/airports')
    }

    const onPlannerIdsChange = async (selectedOptions) => {
        const selectedIds = selectedOptions.map((option) => option.value);
        setPlannerIds(selectedIds);
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
        const remainingOptions = options.filter((option) => !plannerIds.includes(option.value));
        setOptions(remainingOptions);
        setPlannerIds([]);
    }
    }

    let canSave = [validCode, validFullName].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validFullNameClass = !validFullName ? 'form__input--incomplete' : ''

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
                    <h2>Edit airport</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveAirportClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteAirportClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="fullName">
                    Name: <span className="nowrap">[Full name of airport]</span></label>
                <input
                    className={`form__input ${validFullNameClass}`}
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="off"
                    value={fullName}
                    onChange={onFullNameChanged}
                />

                <label className="form__label" htmlFor="code">
                    Code: <span className="nowrap"></span></label>
                <input
                    className={`form__input`}
                    id="code"
                    name="code"
                    type="text"
                    autoComplete="off"
                    value={code}
                    onChange={onCodeChanged}
                    readOnly
                    style={{ backgroundColor: '#dcdcdc', cursor: 'not-allowed' }}
                />

                <label className="form__label" htmlFor="address">
                    Address: <span className="nowrap">[Address]</span></label>
                <input
                    className={`form__input`}
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="off"
                    value={address}
                    onChange={onAddressChanged}
                />

<label className="form__label" htmlFor="managerId">
                  ManagerId: <span className="nowrap"></span></label>
                <input
                    className={`form__input`}
                    id="managerId"
                    name="managerId"
                    type="text"
                    autoComplete="off"
                    value={managerId}
                    onChange={onManagerIdChanged}
                />

            <label className="form__label" htmlFor="plannerIds">
                    PlannerIds:
                </label>
                <Select
                    id="plannerIds"
                    name="plannerIds"
                    options={options}
                    isMulti
                    value={options.filter((option) => plannerIds.includes(option.value))}
                    onChange={onPlannerIdsChange}
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
export default EditAirportForm