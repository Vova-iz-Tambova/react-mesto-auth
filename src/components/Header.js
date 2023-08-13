import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип" />
        <div className="header__container">
          <div>
            <Link to={props.link} className="header__link  link-effect">{props.text}</Link>
          </div>
          <div className="header__email">{props.email}</div>
        </div>
      </header>
    </>
  )
}

export default Header