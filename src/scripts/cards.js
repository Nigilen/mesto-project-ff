import { openPopup, closePopup } from "./modal";
import { likeCard, deleteCard } from "./api.js";

const popupImage = document.querySelector('.popup_type_image');
const popupPicture = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

function createCard(item, cbRemove, cbLike, cbFullImg, userId) {
  const content = document.querySelector('#card-template').content;
  const card = content.querySelector('.card');
  const cloneCard = card.cloneNode(true);
  const cardImg = cloneCard.querySelector('.card__image');
  const cardTitle = cloneCard.querySelector('.card__title');
  const cardLike = cloneCard.querySelector('.card__like-button');
  const btnDelete = cloneCard.querySelector('.card__delete-button');
  const cardLikeCounter = cloneCard.querySelector('.card__like-counter');
  const deletePopup = document.querySelector('.popup_type_delete-card');
  const deletePopupForm = deletePopup.querySelector('.popup__form');
        
  cardImg.setAttribute('src', item.link);
  cardImg.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;
  cardLikeCounter.textContent = item.likes.length;


  item.likes.forEach((like) => {    
    if (like._id == userId) {
      cardLike.classList.add('card__like-button_is-active');
    }
  })

  if (item.owner._id == userId) {
    btnDelete.addEventListener('click', () => {
      openPopup(deletePopup);

      const deleteCard = function(evt) {
        evt.preventDefault();
        cbRemove(cloneCard, item._id);
        closePopup(evt.target.closest('.popup'));
      }

      new Promise(function(resolve, reject) {
        const handleClickDelPopup = function(evt) {
          if(evt.target.classList.contains('button')) {
            deletePopup.removeEventListener('mousedown', handleClickDelPopup);
            document.removeEventListener('keydown', handleClickDelPopup);
            resolve()
          } else if (evt.target.classList.contains('popup_type_delete-card') || 
                    evt.target.classList.contains('popup__close') ||
                    evt.key === "Escape") {
            deletePopup.removeEventListener('mousedown', handleClickDelPopup);
            document.removeEventListener('keydown', handleClickDelPopup);
            reject()
          } 
        }
        deletePopup.addEventListener('mousedown', handleClickDelPopup);
        document.addEventListener('keydown', handleClickDelPopup);
      })
      .then(() => {
        deletePopupForm.addEventListener('submit', deleteCard);
      })
      .catch(() => {
        deletePopupForm.removeEventListener('submit', deleteCard);
      })
  
    })
  } else {
    btnDelete.remove();
  };
           
  cardLike.addEventListener('click', () => cbLike(cardLike, item._id) );

  cardImg.addEventListener('click', () => {
    popupPicture.src = cardImg.src;
    popupPicture.setAttribute('alt', cardTitle.textContent);
    popupCaption.textContent = cardTitle.textContent;
    cbFullImg(popupImage);
  });

  return cloneCard;
};

function like(item, cardId) {
  if (item.classList.contains('card__like-button_is-active')) {
    likeCard(cardId, 'DELETE')
      .then((data) => {
        item.classList.remove('card__like-button_is-active');
        item.nextElementSibling.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });;
  } else {
    likeCard(cardId, 'PUT')
      .then((data) => {
        item.classList.add('card__like-button_is-active');
        item.nextElementSibling.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });;
  };
};


function removeCard(card, id) {
  deleteCard(id)
    .then(card.remove())
    .catch((err) => {
      console.log(err);
    });
};

export {createCard, like, removeCard};