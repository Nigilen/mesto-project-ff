// @todo: Темплейт карточки

const content = document.querySelector('#card-template').content,
      card = content.querySelector('.card');


// @todo: DOM узлы

const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки

const createCard = (arr, cbRemove) => {

  arr.forEach((item) => {
    const cloneCard = card.cloneNode(true),
          cardImg = cloneCard.querySelector('.card__image'),
          cardTitle = cloneCard.querySelector('.card__title'),
          btnDelete = cloneCard.querySelector('.card__delete-button');
          
    cardImg.setAttribute('src', item.link);
    cardImg.setAttribute('alt', item.name);
    cardTitle.textContent = item.name;

    btnDelete.addEventListener('click', cbRemove);

    placesList.append(cloneCard);

  });
};


// @todo: Функция удаления карточки

function removeCard(evt) {
  let target = evt.target;
  let card = target.closest('.card');
  card.remove();
};


// @todo: Вывести карточки на страницу

createCard(initialCards, removeCard);