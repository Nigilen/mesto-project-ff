import { initialCards, createCard,  like, removeCard } from './cards.js'
import { openPopup, closePopup } from './modal.js'

import '../pages/index.css';


const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const editForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const placesList = document.querySelector('.places__list');


function handleSubmitForm(evt) {
  evt.preventDefault();
  closePopup(evt.target.closest('.popup'));
};

editBtn.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  editForm.name.value = profileTitle.textContent;
  editForm.description.value = profileDescription.textContent;
});

addBtn.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
});

editForm.addEventListener('submit', (evt) => {
  profileTitle.textContent = editForm.name.value;
  profileDescription.textContent = editForm.description.value;

  handleSubmitForm(evt);
});

newPlaceForm.addEventListener('submit', (evt) => {
  
  const newCard = createCard(
    { 
      name: newPlaceForm.elements['place-name'].value, 
      link: newPlaceForm.elements.link.value 
    },
    removeCard, 
    like, 
    openPopup
  );
  placesList.prepend(newCard);

  handleSubmitForm(evt);
});

initialCards.forEach((item) => {
  const newCard = createCard(item, removeCard, like, openPopup);
  placesList.append(newCard);
});