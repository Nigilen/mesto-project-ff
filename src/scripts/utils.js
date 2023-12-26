import { closePopup } from "./modal";

export function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  isLoading ? button.textContent = loadingText : button.textContent = buttonText;
}

export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);

  request()
    .then(() => {
      evt.target.reset();
      submitButton.disabled = true;
      closePopup(evt.target.closest('.popup'))
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    })
}