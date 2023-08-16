import iconOk from '../images/ok.svg'
import iconError from '../images/error.svg'

function InfoTooltip(props) {
  return (
    <div className={`popup  ${props.isOpen && "popup_is-opened"}`}>
      <div className="popup__container">
        <img className="popup__icon"
          src={props.errorMessage ? iconError : iconOk}
          alt={props.errorMessage ? 'Иконка успешного запроса' : 'Иконка ошибки'}
        >
        </img>
        <button className="popup__close  link-effect" type="button" onClick={props.onClose}></button>
        <h2 className="popup__message">
          {props.errorMessage
            ? 'Что-то пошло не так! Попробуйте ещё раз.'
            : 'Вы успешно зарегистрировались!'}
        </h2>
      </div>
    </div>
  )
}

export default InfoTooltip