import React from 'react'
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">

      <section className="profile">
        <button className="profile__avatar-button"
          onClick={props.onEditAvatar}>
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
        </button>
        <div className="profile__profile-info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button link-effect"
              onClick={props.onEditProfile} type="button"></button>
          </div>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button className="profile__add-button"
          onClick={props.onAddPlace} type="button"></button>
      </section>

      <section className="elements">
        {props.cards.map((item) => (
          <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </section>

    </main>
  )
}

export default Main