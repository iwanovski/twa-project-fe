import { useState, useEffect } from "react"
import { useAddNewAircraftTypeMutation } from "./aircraftTypesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NAME_REGEX = /^[A-z0-9 ]{3,30}$/
const CODE_REGEX = /^[A-z0-9 -]{3,10}$/

const NewAircraftTypeForm = () => {

  const [addNewAircraftType, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewAircraftTypeMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [code, setCode] = useState('')
  const [validCode, setValidCode] = useState(false)
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [numberOfPlaces, setNumberOfPlaces] = useState(0)

  useEffect(() => {
    setValidName(NAME_REGEX.test(name))
}, [name])

useEffect(() => {
    setValidCode(CODE_REGEX.test(code))
}, [code])

  useEffect(() => {
    if (isSuccess) {
        setName('')
        setCode('')
        setWeight(0)
        setHeight(0)
        setWidth(0)
        setNumberOfPlaces(0)
        navigate('/home/aircraftTypes')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onCodeChanged = e => setCode(e.target.value)
  const onWeightChanged = e => setWeight(e.target.value)
  const onHeightChanged = e => setHeight(e.target.value)
  const onWidthChanged = e => setWidth(e.target.value)
  const onNumberOfPlacesChanged = e => setNumberOfPlaces(e.target.value)

  const canSave = [validName, validCode].every(Boolean) && !isLoading

  const onSaveAircraftTypeClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewAircraftType({ name, code, width, height, weight, numberOfPlaces })
      }
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validNameClass = !validName ? 'form__input--incomplete' : ''
  const validCodeClass = !validCode ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveAircraftTypeClicked}>
            <div className="form__title-row">
                <h2>New aircraftType</h2>
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
                    Name: <span className="nowrap">[3-30 letters]</span></label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
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

            <label className="form__label" htmlFor="weight">
                    Weight: <span className="nowrap">[Weight in tn]</span></label>
                <input
                    className={`form__input`}
                    id="weight"
                    name="weight"
                    type="number"
                    autoComplete="off"
                    value={weight}
                    onChange={onWeightChanged}
                />

                
            <label className="form__label" htmlFor="height">
                    Weight: <span className="nowrap">[Height in m]</span></label>
                <input
                    className={`form__input`}
                    id="height"
                    name="height"
                    type="number"
                    autoComplete="off"
                    value={height}
                    onChange={onHeightChanged}
                />

                
            <label className="form__label" htmlFor="width">
                    Width: <span className="nowrap">[Width in metres]</span></label>
                <input
                    className={`form__input`}
                    id="width"
                    name="width"
                    type="number"
                    autoComplete="off"
                    value={width}
                    onChange={onWidthChanged}
                />

                
            <label className="form__label" htmlFor="numberOfPlaces">
                    Number of places: <span className="nowrap">[Amount of seats]</span></label>
                <input
                    className={`form__input`}
                    id="numberOfPlaces"
                    name="numberOfPlaces"
                    type="number"
                    autoComplete="off"
                    value={numberOfPlaces}
                    onChange={onNumberOfPlacesChanged}
                /> 

        </form>
    </>
  )

  return content;
}

export default NewAircraftTypeForm