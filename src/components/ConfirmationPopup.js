function ConfirmationPopup(props) {
  function handleDeleteClick() { props.onCardDelete(props.card) }
  
  return (
    <div className={`popup  popup_type_${props.name} ${props.isOpen && "popup_is-opened"}`}>
      <div className="popup__container">
        <button className="popup__close  link-effect" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">Вы уверены?</h2>
        <div className="popup__form" name="form" noValidate>
          <button className="popup__submit" type="button" onClick={handleDeleteClick}>Да</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup