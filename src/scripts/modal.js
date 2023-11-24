function openPopup(item) {
  item.classList.add('popup_is-animated', 'popup_is-opened');

  function handleEscPress(evt) {
    if (evt.key === 'Escape') {
      closePopup(item);
      document.removeEventListener('keydown', handleEscPress);
    };
  };

  item.querySelector('.popup__close').addEventListener('click', () => closePopup(item));
  item.addEventListener('click', evt => { if (evt.target.classList.contains('popup')) closePopup(item) });
  document.addEventListener('keydown', handleEscPress);
};

function closePopup(item) {
  item.classList.remove('popup_is-opened');
  if (item.querySelector('.popup__form')) item.querySelector('.popup__form').reset();
};

export { openPopup, closePopup };