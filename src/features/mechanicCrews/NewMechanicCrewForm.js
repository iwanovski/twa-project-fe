import { useState, useEffect } from "react"
import { useAddNewMechanicCrewMutation } from "./mechanicCrewsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"

const NAME_REGEX = /^[A-z0-9 ]{3,30}$/

const NewMechanicCrewForm = () => {

  const [addNewMechanicCrew, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewMechanicCrewMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [homeAirportCode, setHomeAirportCode] = useState('')
  const [aircraftTypeCodes, setAircraftTypeCodes] = useState([]);
  const [typesOptions, setTypesOptions] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name))
  }, [name])

  useEffect(() => {
    if (isSuccess) {
        setName('')
        setHomeAirportCode('')
        setAircraftTypeCodes([])
        setMemberIds([])
        navigate('/home/mechanicCrews')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onHomeAirportCodeChanged = e => setHomeAirportCode(e.target.value)

  const canSave = [validName].every(Boolean) && !isLoading

  const onSaveMechanicCrewClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewMechanicCrew({ name, homeAirportCode, aircraftTypeCodes, memberIds })
      }
  }
  const onGoBackClicked = async () => {
    navigate('/home/mechanicCrews')
  }

  const onMemberIdsChange = async (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setMemberIds(selectedIds);
  }

  const onAircraftTypeCodesChange = async (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setAircraftTypeCodes(selectedIds);
  }

  const handleAddMemberId = async () => {
    const newId = prompt('Enter new ID:');
    if (newId && !options.some((option) => option.value === newId)) {
        setOptions([...options, { value: newId, label: newId }]);
    }
  }

  const handleAddAircraftTypeCode = async () => {
    const newId = prompt('Enter aircraftType code:');
    if (newId && !typesOptions.some((option) => option.value === newId)) {
        setTypesOptions([...typesOptions, { value: newId, label: newId }]);
    }
  }

  const handleRemoveMemberId = async () => {
    const confirmed = window.confirm('Are you sure you want to remove the selected IDs?');
    if (confirmed) {
      const remainingOptions = options.filter((option) => !memberIds.includes(option.value));
      setOptions(remainingOptions);
      setMemberIds([]);
    }
  }

  const handleRemoveAircraftTypeCode = async () => {
    const confirmed = window.confirm('Are you sure you want to remove the selected codes?');
    if (confirmed) {
      const remainingOptions = options.filter((option) => !memberIds.includes(option.value));
      setTypesOptions(remainingOptions);
      setAircraftTypeCodes([]);
    }
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validNameClass = !validName ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveMechanicCrewClicked}>
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
                <h2>Create new aircraft</h2>
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

            <label className="form__label" htmlFor="memberIds">
                    MemberIds:
                </label>
                <Select
                    id="memberIds"
                    name="memberIds"
                    options={options}
                    isMulti
                    value={options.filter((option) => memberIds.includes(option.value))}
                    onChange={onMemberIdsChange}
                />
                <div>
                    <button onClick={handleAddMemberId}>Add ID</button>
                    <button onClick={handleRemoveMemberId}>Remove Selected IDs</button>
                </div>

            <label className="form__label" htmlFor="aircraftTypeCodes">
                    AircraftTypeCodes:
                </label>
                <Select
                    id="aircraftTypeCodes"
                    name="aircraftTypeCodes"
                    options={typesOptions}
                    isMulti
                    value={typesOptions.filter((option) => aircraftTypeCodes.includes(option.value))}
                    onChange={onAircraftTypeCodesChange}
                />
                <div>
                    <button onClick={handleAddAircraftTypeCode}>Add code</button>
                    <button onClick={handleRemoveAircraftTypeCode}>Remove selected codes</button>
                </div>

        </form>
    </>
  )

  return content;
}

export default NewMechanicCrewForm