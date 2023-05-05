import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

// Just default regex without regarding safety
const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,25}$/
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const FULL_NAME_REGEX = /^[A-z0-9 ]{3,50}$/

const NewUserForm = () => {

  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [fullName, setFullName] = useState('')
  const [validFullName, setValidFullName] = useState(false)
  const [roles, setRoles] = useState([])

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidFullName(FULL_NAME_REGEX.test(fullName))
  }, [fullName])

  useEffect(() => {
    if (isSuccess) {
        setUsername('')
        setPassword('')
        setEmail('')
        setFullName('')
        setRoles([])
        navigate('/home/users')
    }
  }, [isSuccess, navigate])

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)
  const onFullNameChanged = e => setFullName(e.target.value)

  const onRolesChanged = e => {
    const values = Array.from(
        e.target.selectedOptions, //HTMLCollection 
        (option) => option.value
    )
    setRoles(values)
  }

  const canSave = [validUsername, validPassword, validEmail, validFullName, roles.length, roles.length < 2].every(Boolean) && !isLoading

  const onSaveUserClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
          await addNewUser({ username, password, email, fullName, roles })
      }
  }

  const onGoBackClicked = async () => {
    navigate('/home/users')
  }

  const options = Object.values(ROLES).map(role => {
    return (
        <option
            key={role}
            value={role}

        > {role}</option >
    )
  })

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
  const validFullNameClass = !validFullName ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

  const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onSaveUserClicked}>
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
                <h2>New User</h2>
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

            <label className="form__label" htmlFor="username">
                Username: <span className="nowrap">[3-20 letters]</span></label>
            <input
                className={`form__input ${validUserClass}`}
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                value={username}
                onChange={onUsernameChanged}
            />

            <label className="form__label" htmlFor="password">
                Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
            <input
                className={`form__input ${validPwdClass}`}
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChanged}
            />

            <label className="form__label" htmlFor="email">
                Email: <span className="nowrap">[Valid email address]</span></label>
            <input
                className={`form__input ${validEmailClass}`}
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={onEmailChanged}
            />

            <label className="form__label" htmlFor="fullName">
                FullName: <span className="nowrap">[]</span></label>
            <input
                className={`form__input ${validFullNameClass}`}
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                onChange={onFullNameChanged}
            />

            <label className="form__label" htmlFor="roles">
                    Role:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="13"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>   

        </form>
    </>
  )

  return content;
}

export default NewUserForm