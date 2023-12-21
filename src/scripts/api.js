export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '397c7185-000a-4a1c-a6b0-631c387bbfc7',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const patchUserAvatar = (ava) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers, 
    body: JSON.stringify({
      avatar: ava
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const patchUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    }) 
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const postNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers, 
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}


export const likeCard = (id, item, met) => {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-3/cards/likes/${id}`, {
    method: met,
    headers: {
      authorization: '397c7185-000a-4a1c-a6b0-631c387bbfc7'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    item.nextElementSibling.textContent = data.likes.length;
  });
} 


export const deleteCard = (id) => {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-3/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '397c7185-000a-4a1c-a6b0-631c387bbfc7'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}