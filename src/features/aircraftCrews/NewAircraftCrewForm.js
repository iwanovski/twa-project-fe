import { useState, useEffect } from "react"
import { useAddNewAircraftCrewMutation} from "./aircraftCrewsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const NAME_REGEX = /^[A-z0-9 ]{3,30}$/

const NewAircraftCrewForm = () => {

  const [addNewAircraftCrew, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewAircraftCrewMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [mainPilotId, setMainPilotId] = useState('')
  const [secondPilotId, setSecondPilotId] = useState('')
  const members = []

  useEffect(() => {
    setValidName(NAME_REGEX.test(name))
  }, [name])

  useEffect(() => {
    if (isSuccess) {
        setName('')
        setMainPilotId('')
        setSecondPilotId('')
        navigate('/home/aircraftCrews')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onMainPilotIdChanged = e => setMainPilotId(e.target.value)
  const onSecondPilotIdChanged = e => setSecondPilotId(e.target.value)

  const canSave = [validName].every(Boolean) && !isLoading

  const onSaveAircraftCrewClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewAircraftCrew({ name, mainPilotId, secondPilotId, members })
      }
  }

  const onGoBackClicked = async () => {
    navigate('/home/aircraftCrews')
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validNameClass = !validName ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveAircraftCrewClicked}>
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

  return content;
}

export default NewAircraftCrewForm