import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'

function Header(props) {

  function onSignOut() {
    localStorage.removeItem("jwt")
    props.setLoggedIn(false)
  }

  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип" />
        <div className="header__container">
          <div>
            <Link to={props.link} onClick={onSignOut}
              className="header__link  link-effect">
              {props.text}
            </Link>
          </div>
          <div className="header__email">{props.email}</div>
        </div>
      </header>
    </>
  )
}

export default Header