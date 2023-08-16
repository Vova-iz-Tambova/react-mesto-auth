import React from 'react'
import { Link } from 'react-router-dom'
import { register } from '../utils/auth'
import InfoTooltip from './InfoTooltip'

function Register() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  function closeInfoTooltipPopup() {
    setIsInfoTooltipPopupOpen(false)
  }

  function handleEmail(e) { setEmail(e.target.value) }
  function handlePassword(e) { setPassword(e.target.value) }
  function handleSubmit(e) {
    e.preventDefault()
    register(email, password)
      .then(() => {
        setErrorMessage('')
      })
      .catch((err) => {
        setErrorMessage(err)
        console.log(err)
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true)
      })
  }

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input required
            className="auth__input"
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleEmail}
          />
          <input required
            className="auth__input"
            type="password"
            value={password}
            placeholder="Пароль"
            onChange={handlePassword}
          />
          <button className="auth__submit" type="submit">Зарегестрироваться</button>
        </form>
        <p>Уже зарегестрированы? <Link className="link-effect" to="/sign-in">Войти</Link></p>
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeInfoTooltipPopup}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default Register