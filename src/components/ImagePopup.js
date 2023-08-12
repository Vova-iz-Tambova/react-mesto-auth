function ImagePopup(props) {
  return (
    <div className={`popup popup_type_${props.name}  ${props.isOpen && "popup_is-opened"}`}>
      <div className="popup__container-photo">
        <button className="popup__close  link-effect" type="button" onClick={props.onClose}></button>
        <img src={props.card.link} alt={props.card.name} onClick={props.onCardClick} className="popup__fullscreen-photo" />
        <h3 className="popup__fullscreen-title">{props.card.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup