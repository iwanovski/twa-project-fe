import { useState, useEffect } from "react"
import { useAddNewAircraftMutation } from "./aircraftsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const CODE_REGEX = /^[A-z0-9 -]{3,10}$/
const AIRPORT_CODE_REGEX = /^[A-z0-9 -]{3,5}$/

const NewAircraftForm = () => {

  const [addNewAircraft, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewAircraftMutation()

  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [validCode, setValidCode] = useState(false)
  const [aircraftTypeCode, setAircraftTypeCode] = useState('')
  const [validAircraftTypeCode, setValidAircraftTypeCode] = useState(false)
  const [homeAirportCode, setHomeAirportCode] = useState('')
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
    if (isSuccess) {
        setCode('')
        setAircraftTypeCode('')
        setHomeAirportCode('')
        navigate('/home/aircrafts')
    }
  }, [isSuccess, navigate])

  const onCodeChanged = e => setCode(e.target.value)
  const onAircraftTypeCodeChanged = e => setAircraftTypeCode(e.target.value)
  const onHomeAirportCodeChanged = e => setHomeAirportCode(e.target.value)

  const canSave = [validCode, validAircraftTypeCode, validHomeAirportCode].every(Boolean) && !isLoading

  const onSaveAircraftClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewAircraft({ code, aircraftTypeCode, homeAirportCode })
      }
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validCodeClass = !validCode ? 'form__input--incomplete' : ''
  const validAircraftTypeCodeClass = !validCode ? 'form__input--incomplete' : ''
  const validHomeAirportCodeClass = !validCode ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveAircraftClicked}>
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

  return content;
}

export default NewAircraftForm