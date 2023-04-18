import { useState, useEffect } from "react"
import { useUpdateAirportMutation, useDeleteAirportMutation } from "./airportsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

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

    const [fullName, setFullName] = useState(airport.fullName)
    const [validFullName, setValidFullName] = useState(false)
    const [code, setCode] = useState(airport.code)
    const [validCode, setValidCode] = useState(false)
    const [address, setAddress] = useState(airport.address)

    useEffect(() => {
        setValidFullName(NAME_REGEX.test(fullName))
    }, [fullName])

    useEffect(() => {
        setValidCode(CODE_REGEX.test(code))
    }, [code])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setFullName('')
            setCode('')
            setAddress('')
            navigate('/home/airports')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onFullNameChanged = e => setFullName(e.target.value)
    const onCodeChanged = e => setCode(e.target.value)
    const onAddressChanged = e => setAddress(e.target.value)

    const onSaveAirportClicked = async (e) => {
        await updateAirport({ id: airport.id, fullName, code, address })
    }

    const onDeleteAirportClicked = async () => {
        await deleteAirport({ id: airport.id })
    }

    let canSave = [validCode, validFullName].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validFullNameClass = !validFullName ? 'form__input--incomplete' : ''
    const validCodeClass = !validCode ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
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

            </form>
        </>
    )

    return content
}
export default EditAirportForm