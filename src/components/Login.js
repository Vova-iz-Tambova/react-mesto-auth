import React from "react"

function Login(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleEmail(e) { setEmail(e.target.value) }
  function handlePassword(e) { setPassword(e.target.value) }
  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(email, password)
  }

  return (
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
  )
}

export default Login