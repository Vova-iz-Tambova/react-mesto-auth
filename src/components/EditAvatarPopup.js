import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({ avatar: avatarRef.current.value })
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <div className="popup__field">
        <input required
          type="url"
          id="profileAvatar"
          name="profileAvatar"
          className="popup__input  popup__input_avatar_link"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
        />
        <span
          id="profileAvatar-error"
          className="popup__error">
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup