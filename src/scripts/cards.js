const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const popupImage = document.querySelector('.popup_type_image');
const popupPicture = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

function createCard(item, cbRemove, cbLike, cbFullImg) {
  const content = document.querySelector('#card-template').content;
  const card = content.querySelector('.card');
  const cloneCard = card.cloneNode(true);
  const cardImg = cloneCard.querySelector('.card__image');
  const cardTitle = cloneCard.querySelector('.card__title');
  const cardLike = cloneCard.querySelector('.card__like-button');
  const btnDelete = cloneCard.querySelector('.card__delete-button');
        
  cardImg.setAttribute('src', item.link);
  cardImg.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;

  btnDelete.addEventListener('click', cbRemove);

  cardLike.addEventListener('click', () => cbLike(cardLike) );

  cardImg.addEventListener('click', () => {
    popupPicture.src = cardImg.src;
    popupPicture.setAttribute('alt', cardTitle.textContent);
    popupCaption.textContent = cardTitle.textContent;
    cbFullImg(popupImage);
  });

  return cloneCard;
};

function like(item) {
  item.classList.toggle('card__like-button_is-active');
};

function removeCard(evt) {
  const target = evt.target;
  const card = target.closest('.card');
  card.remove();
};


export {initialCards, createCard, like, removeCard};
