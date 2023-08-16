import React, { useEffect } from 'react'
import { authorize, checkToken } from '../utils/auth'
import InfoTooltip from './InfoTooltip'

function Login(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  function closeInfoTooltipPopup() {
    setIsInfoTooltipPopupOpen(false)
  }

  function onLogin(res) {
    localStorage.setItem("jwt", res.token)
    props.setLoggedIn(true)
    props.setEmail(email)
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            props.setLoggedIn(true)
            props.setEmail(res.data.email)
          }
        })
        .catch((err) => {
          setIsInfoTooltipPopupOpen(true)
          setErrorMessage(err)
          console.log(err)
        })
    }
  })

  function handleEmail(e) { setEmail(e.target.value) }
  function handlePassword(e) { setPassword(e.target.value) }
  function handleSubmit(e) {
    e.preventDefault()
    authorize(email, password)
      .then((res) => {
        onLogin(res)
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true)
        setErrorMessage(err)
        console.log(err)
      })
  }

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
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
          <button className="auth__submit" type="submit">Войти</button>
        </form>
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeInfoTooltipPopup}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default Login