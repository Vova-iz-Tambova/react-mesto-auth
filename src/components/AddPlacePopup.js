import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleName(e) { setName(e.target.value) }
  function handleLink(e) { setLink(e.target.value) }

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({ name: name, link: link })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <div className="popup__field">
        <input required
          id="name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleName}
          className="popup__input  popup__input_mesto_name"
          placeholder="Название" />
        <span id="name-error" className="popup__error"></span>
      </div>
      <div className="popup__field">
        <input required
          id="link"
          name="link"
          type="url"
          value={link}
          onChange={handleLink}
          className="popup__input  popup__input_mesto_link"
          placeholder="Ссылка на картинку" />
        <span id="link-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup