import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'

function Header(props) {

  function onSignOut() {
    localStorage.removeItem("jwt")
    props.setLoggedIn(false)
  }

  return (
      <header className="header">
        <div className={`${props.loggedIn && "header__nav"}`}>
        <img className="header__logo" src={logo} alt="логотип" />
        </div>
        <div className={"header__menu"}>
          <div>
            <Link to={props.link} onClick={onSignOut}
              className={`${props.loggedIn && "header__link"} link-effect`}>
              {props.text}
            </Link>
          </div>
          <div className="header__email">{props.email}</div>
        </div>
      </header>
  )
}

export default Header