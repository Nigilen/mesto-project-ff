import { popupTypeEdit, popupTypeNewCard, popupEditAvatar, editBtn, addBtn, editAvatar, editForm, newPlaceForm, editAvatarForm, profileTitle, profileDescription, placesList, popups, settings } from './constants.js'
import { createCard, like, removeCard} from './cards.js'
import { openPopup, closePopup} from './modal.js'
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, patchUserAvatar, patchUserInfo, postNewCard } from './api.js';
import { handleSubmit } from './utils.js';

import '../pages/index.css';

let userId;

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
      .then(() => {
        editAvatar.style.backgroundImage = `url(${editAvatarForm.elements.link.value})`;
      })
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
  }
  handleSubmit(makeRequest, evt);
})

newPlaceForm.addEventListener('submit', (evt) => {
  function makeRequest() {
    return postNewCard(newPlaceForm.elements['place-name'].value, newPlaceForm.elements.link.value)
      .then((card) => {
        const newCard = createCard(card, removeCard, like, openPopup, userId);
        placesList.prepend(newCard);
      })

  }
  handleSubmit(makeRequest, evt);
});



enableValidation(settings); 

Promise.all([getUserInfo(), getInitialCards()])
  .then(([info, cards]) => {
    userId = info._id;
    profileTitle.textContent = info.name;
    profileDescription.textContent = info.about;
    editAvatar.setAttribute('style', `background-image: url(${info.avatar})`);
    cards.forEach((item) => {
      const newCard = createCard(item, removeCard, like, openPopup, userId);
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  }); 