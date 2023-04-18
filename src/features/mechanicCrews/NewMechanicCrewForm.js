import { useState, useEffect } from "react"
import { useAddNewMechanicCrewMutation } from "./mechanicCrewsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NAME_REGEX = /^[A-z0-9 ]{3,30}$/

const NewMechanicCrewForm = () => {

  const [addNewAircraftCrew, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewMechanicCrewMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [homeAirportCode, setHomeAirportCode] = useState('')
  const aircraftTypeCodes = []
  const members = []

  useEffect(() => {
    setValidName(NAME_REGEX.test(name))
  }, [name])

  useEffect(() => {
    if (isSuccess) {
        setName('')
        setHomeAirportCode('')
        navigate('/home/mechanicCrews')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onHomeAirportCodeChanged = e => setHomeAirportCode(e.target.value)

  const canSave = [validName].every(Boolean) && !isLoading

  const onSaveAircraftCrewClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewAircraftCrew({ name, homeAirportCode, aircraftTypeCodes, members })
      }
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validNameClass = !validName ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveAircraftCrewClicked}>
            <div className="form__title-row">
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

        </form>
    </>
  )

  return content;
}

export default NewMechanicCrewForm