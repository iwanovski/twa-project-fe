import { useState, useEffect } from "react"
import { useAddNewAirportMutation } from "./airportsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"

const NAME_REGEX = /^[A-z0-9 ]{3,30}$/
const CODE_REGEX = /^[A-z0-9 -]{3,10}$/

const NewAirportForm = () => {

  const [addNewAirport, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewAirportMutation()

  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [validFullName, setValidFullName] = useState(false)
  const [code, setCode] = useState('')
  const [validCode, setValidCode] = useState(false)
  const [address, setAddress] = useState('')
  const [managerId, setManagerId] = useState('')
  const [plannerIds, setPlannerIds] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValidFullName(NAME_REGEX.test(fullName))
  }, [fullName])

  useEffect(() => {
    setValidCode(CODE_REGEX.test(code))
  }, [code])

  useEffect(() => {
    if (isSuccess) {
        setFullName('')
        setCode('')
        setAddress('')
        setManagerId('')
        setPlannerIds([])
        navigate('/home/airports')
    }
  }, [isSuccess, navigate])

  const onFullNameChanged = e => setFullName(e.target.value)
  const onCodeChanged = e => setCode(e.target.value)
  const onAddressChanged = e => setAddress(e.target.value)
  const onManagerIdChanged = e => setManagerId(e.target.value)
  

  const canSave = [validCode, validFullName].every(Boolean) && !isLoading

  const onSaveAirportClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewAirport({ fullName, code, address, managerId, plannerIds })
      }
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

  const errClass = isError ? "errmsg" : "offscreen"
  const validFullNameClass = !validFullName ? 'form__input--incomplete' : ''
  const validCodeClass = !validCode ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveAirportClicked}>
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
                <h2>New airport</h2>
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

  return content;
}

export default NewAirportForm