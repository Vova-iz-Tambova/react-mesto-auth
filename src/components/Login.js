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
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input required
          className="login__input"
          type="email"
          value={email}
          placeholder="Email"
          onChange={handleEmail}
        />
        <input required
          className="login__input"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={handlePassword}
        />
        <button className="login__submit" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login