
function openPopup(item) {
  item.classList.add('popup_is-animated', 'popup_is-opened');
  document.addEventListener('keydown', handleEscPress);
};

function handleEscPress(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  };
};

function closePopup(item) {
  item.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscPress);
};


export { openPopup, closePopup };