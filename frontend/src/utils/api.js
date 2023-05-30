class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  updateUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }
  updateAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }
  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus (id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        headers: this._headers,
        method: "PUT",
      })
        .then((res) => this._checkResponse(res))
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        headers: this._headers,
        method: "DELETE",
      })
        .then((res) => this._checkResponse(res))
    }
  }

}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "480b5a02-860e-4e93-b3ff-2cb152b07e87",
    "Content-Type": "application/json",
  },
});

export default api;
