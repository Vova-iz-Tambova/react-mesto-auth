import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authorize } from '../utils/auth'
import InfoTooltip from './InfoTooltip'

function Login(props) {
  const [email, setEmail] = React.useState('email@yandex.ru')
  const [password, setPassword] = React.useState('somepassword')

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const navigate = useNavigate()

  function closeInfoTooltipPopup() {
    setIsInfoTooltipPopupOpen(false)
  }

  function onLogin(res) {
    localStorage.setItem("jwt", res.token)
    props.setLoggedIn(true)
    props.setEmail(email)
    navigate('/')
  }

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