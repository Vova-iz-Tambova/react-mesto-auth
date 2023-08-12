import React from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  function handleName(e) { setName(e.target.value) }
  function handleDescription(e) { setDescription(e.target.value) }

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({ name, about: description })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}>
      <div className="popup__field">
        <input required
          id="profileName"
          name="profileName"
          type="text"
          minLength="2"
          maxLength="40"
          className="popup__input  popup__input_profile_name"
          placeholder="Введите имя"
          value={name}
          onChange={handleName} />
        <span id="profileName-error" className="popup__error"></span>
      </div>
      <div className="popup__field">
        <input required
          id="profileStatus"
          name="profileStatus"
          type="text"
          minLength="2"
          maxLength="200"
          className="popup__input  popup__input_profile_job"
          placeholder="Введите статус"
          value={description}
          onChange={handleDescription} />
        <span id="profileStatus-error" className="popup__error"> </span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup