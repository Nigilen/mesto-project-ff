// @todo: Темплейт карточки

const content = document.querySelector('#card-template').content,
      card = content.querySelector('.card');


// @todo: DOM узлы

const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки

const createCard = function(item, cbRemove) {

  const cloneCard = card.cloneNode(true),
      cardImg = cloneCard.querySelector('.card__image'),
      cardTitle = cloneCard.querySelector('.card__title'),
      btnDelete = cloneCard.querySelector('.card__delete-button');
        
  cardImg.setAttribute('src', item.link);
  cardImg.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;

  btnDelete.addEventListener('click', cbRemove);

  return cloneCard;
};


// @todo: Функция удаления карточки

function removeCard(evt) {
  const target = evt.target;
  const card = target.closest('.card');
  card.remove();
};


// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  const newCard = createCard(item, removeCard);
  placesList.append(newCard);
});