import { createCard, like, removeCard} from './cards.js'
import { openPopup, closePopup} from './modal.js'
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, patchUserAvatar, patchUserInfo, postNewCard } from './api.js';
import { handleSubmit } from './utils.js';

import '../pages/index.css';


const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const editAvatar = document.querySelector('.profile__image');

const editForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];
const editAvatarForm = document.forms['edit-avatar'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const placesList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_is-opened')) closePopup(popup);
    if (evt.target.classList.contains('popup__close')) closePopup(popup);
  });
});

editBtn.addEventListener('click', () => {
  editForm.reset();
  clearValidation(settings, editForm);
  openPopup(popupTypeEdit);

  editForm.name.value = profileTitle.textContent;
  editForm.description.value = profileDescription.textContent;
});

addBtn.addEventListener('click', () => {
  newPlaceForm.reset();
  clearValidation(settings, newPlaceForm);
  openPopup(popupTypeNewCard);
});

editAvatar.addEventListener('click', () => {
  editAvatarForm.reset();
  clearValidation(settings, popupEditAvatar);
  openPopup(popupEditAvatar);
});

editAvatarForm.addEventListener('submit', (evt) => {
  function makeRequest() {
    return patchUserAvatar(editAvatarForm.elements.link.value)
      .then(editAvatar.style.backgroundImage = `url(${editAvatarForm.elements.link.value})`)
      .then(closePopup(evt.target.closest('.popup')));
  }
  handleSubmit(makeRequest, evt);
});

editForm.addEventListener('submit', (evt) => {
  function makeRequest() {
    return patchUserInfo(editForm.name.value, editForm.description.value)
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
      })
      .then(closePopup(evt.target.closest('.popup')));
  }
  handleSubmit(makeRequest, evt);
})

newPlaceForm.addEventListener('submit', (evt) => {
  function makeRequest() {
    return postNewCard(newPlaceForm.elements['place-name'].value, newPlaceForm.elements.link.value)
      .then(() => {
        getInitialCards()
          .then((cards) => {
            placesList.innerHTML = '';
            cards.forEach((item) => {
              const newCard = createCard(item, removeCard, like, openPopup, "bfb916be30e790576dcc2d84");
              placesList.append(newCard);
            });
          })
      })
      .then(closePopup(evt.target.closest('.popup')));
  }
  handleSubmit(makeRequest, evt);
});



enableValidation(settings); 

Promise.all([getUserInfo(), getInitialCards()])
  .then(([info, cards]) => {
    document.querySelector('.profile__title').textContent = info.name;
    document.querySelector('.profile__description').textContent = info.about;
    document.querySelector('.profile__image').setAttribute('style', `background-image: url(${info.avatar})`);
    cards.forEach((item) => {
      const newCard = createCard(item, removeCard, like, openPopup, info._id);
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  }); 