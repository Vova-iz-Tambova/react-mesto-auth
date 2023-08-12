import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import CurrentUserContext from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilepopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmationPopup from './ConfirmationPopup'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' })

  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }
  function handleConfirmationPopupClick(card) {
    setSelectedCard(card)
    setIsConfirmationPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsConfirmationPopupOpen(false)
  }

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([info, cards]) => {
        setCurrentUser(info)
        setCards(cards)
      }).catch(console.error)
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    }).catch(console.error)
  }

  function handleCardDelete(card) {
    api.delMyCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
        closeAllPopups()
      }).catch(console.error)
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch(console.error)
  }

  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar({ avatar })
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch(console.error)
  }

  function handleAddPlace({ name, link }) {
    api.setNewCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      }).catch(console.error)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmationPopupClick}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup
          name="image"
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmationPopup
          name="confirm-delete"
          card={selectedCard}
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
