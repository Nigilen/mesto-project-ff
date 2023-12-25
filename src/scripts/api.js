import {checkResponse} from './utils.js'

export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '397c7185-000a-4a1c-a6b0-631c387bbfc7',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(`${config.baseUrl}` + url, options).then(checkResponse)
}

export const getInitialCards = () => {
  return request('/cards', { headers: config.headers })
}

export const getUserInfo = () => {
  return request('/users/me', { headers: config.headers })
}

export const patchUserAvatar = (ava) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers, 
    body: JSON.stringify({
      avatar: ava
    }) 
  })
}  

export const patchUserInfo = (userName, userAbout) => {
  return request('/users/me', { 
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    }) 
  })
}

export const postNewCard = (cardName, cardLink) => {
  return request('/cards', { 
    method: 'POST',
    headers: config.headers, 
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
}

export const likeCard = (id, mtd) => {
  return request(`/cards/likes/${id}`, { 
    method: mtd,
    headers: config.headers
  })
} 

export const deleteCard = (id) => {
  return request(`/cards/${id}`, { 
    method: 'DELETE',
    headers: config.headers
  })
}