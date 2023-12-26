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
      cbRemove(cloneCard, item._id);
    })
  } else {
    btnDelete.remove();
  };
           
  cardLike.addEventListener('click', () => cbLike(cardLike, item._id) );

  cardImg.addEventListener('click', () => {
    popupPicture.src = item.link;
    popupPicture.setAttribute('alt', item.name);
    popupCaption.textContent = item.name;
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
        console.error(`Ошибка: ${err}`);
      });
  } else {
    likeCard(cardId, 'PUT')
      .then((data) => {
        item.classList.add('card__like-button_is-active');
        item.nextElementSibling.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
      
  };
};


function removeCard(card, id) {
  deleteCard(id)
    .then(() => card.remove())
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
};

export {createCard, like, removeCard};