function showError(validationConfig, form, element, errorMessage) {
  const errorElement = form.querySelector(`.${element.id}-error`);
  errorElement.textContent = errorMessage;
  element.classList.add(validationConfig.errorClass);
}

function hideError(validationConfig, form, element) {
  const errorElement = form.querySelector(`.${element.id}-error`);
  errorElement.textContent = '';
  element.classList.remove(validationConfig.errorClass);
}

function isValid(validationConfig, form, formInput) {
  if(formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  if(!formInput.validity.valid) {
    showError(validationConfig, form, formInput, formInput.validationMessage);
  } else {
    hideError(validationConfig, form, formInput);
  };
}

function setEventListeners(validationConfig, form) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const btn = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(validationConfig, inputList, btn);
  inputList.forEach((item) => {
    item.addEventListener('input', () => {
      isValid(validationConfig, form, item);
      toggleButtonState(validationConfig, inputList, btn);
    })
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(validationConfig, inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}


function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((item) => {
    setEventListeners(validationConfig, item);
  })
}


function clearValidation(validationConfig, form) { 
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((input) => {
    hideError(validationConfig, form, input);
  })
}

export {enableValidation, clearValidation}