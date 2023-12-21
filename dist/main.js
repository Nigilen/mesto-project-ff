(()=>{"use strict";function e(e){e.classList.add("popup_is-animated","popup_is-opened"),document.addEventListener("keydown",t)}function t(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t)}var o={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-3",headers:{authorization:"397c7185-000a-4a1c-a6b0-631c387bbfc7","Content-Type":"application/json"}},r=function(e,t,n){return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-3/cards/likes/".concat(e),{method:n,headers:{authorization:"397c7185-000a-4a1c-a6b0-631c387bbfc7"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){t.nextElementSibling.textContent=e.likes.length}))},c=document.querySelector(".popup_type_image"),a=c.querySelector(".popup__image"),i=c.querySelector(".popup__caption");function u(t,o,r,u,s){var l=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),d=l.querySelector(".card__image"),p=l.querySelector(".card__title"),f=l.querySelector(".card__like-button"),m=l.querySelector(".card__delete-button"),_=l.querySelector(".card__like-counter"),y=document.querySelector(".popup_type_delete-card"),v=y.querySelector(".popup__form");return d.setAttribute("src",t.link),d.setAttribute("alt",t.name),p.textContent=t.name,t.owner&&(t.likes.forEach((function(e){e._id==s&&f.classList.add("card__like-button_is-active")})),_.textContent=t.likes.length,t.owner._id==s?m.addEventListener("click",(function(){e(y),v.addEventListener("submit",(function(e){e.preventDefault(),o(l,t._id),n(e.target.closest(".popup"))}))})):m.remove()),f.addEventListener("click",(function(){return r(f,t._id)})),d.addEventListener("click",(function(){a.src=d.src,a.setAttribute("alt",p.textContent),i.textContent=p.textContent,u(c)})),l}function s(e,t){e.classList.contains("card__like-button_is-active")?(e.classList.remove("card__like-button_is-active"),r(t,e,"DELETE")):(e.classList.add("card__like-button_is-active"),r(t,e,"PUT"))}function l(e,t){console.log(e),e.remove(),function(e){fetch("https://mesto.nomoreparties.co/v1/wff-cohort-3/cards/".concat(e),{method:"DELETE",headers:{authorization:"397c7185-000a-4a1c-a6b0-631c387bbfc7"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t)}function d(e,t,n){t.querySelector(".".concat(n.id,"-error")).textContent="",n.classList.remove(e.errorClass)}function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))}function f(e,t){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(n){d(e,t,n)}))}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var _,y=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_edit-avatar"),b=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),k=document.querySelector(".profile__image"),q=document.forms["edit-profile"],g=document.forms["new-place"],E=document.forms["edit-avatar"],C=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),j=document.querySelector(".places__list"),A=document.querySelectorAll(".popup"),x={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function w(e){e.preventDefault(),n(e.target.closest(".popup"))}function P(e,t){t.querySelector(".button").textContent=e?"Сохранение...":"Сохранить"}A.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&n(e),t.target.classList.contains("popup__close")&&n(e)}))})),b.addEventListener("click",(function(){q.reset(),f(x,q),e(y),q.name.value=C.textContent,q.description.value=L.textContent})),S.addEventListener("click",(function(){g.reset(),f(x,g),e(v)})),k.addEventListener("click",(function(){E.reset(),f(x,h),e(h)})),E.addEventListener("submit",(function(e){var t;P(!0,E),(t=E.elements.link.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).catch((function(e){console.log(e)})),k.style.backgroundImage="url()",w(e)})),q.addEventListener("submit",(function(e){var t,n;P(!0,q),(t=q.name.value,n=q.description.value,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).catch((function(e){console.log(e)})).finally((function(){P(!1,q)})),C.textContent=q.name.value,L.textContent=q.description.value,w(e)})),g.addEventListener("submit",(function(t){var n,r;t.preventDefault(),P(!0,g),(n=g.elements["place-name"].value,r=g.elements.link.value,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).catch((function(e){console.log(e)})).finally((function(){P(!1,g)}));var c=u({name:g.elements["place-name"].value,link:g.elements.link.value},l,s,e);j.prepend(c),w(t)})),_=x,Array.from(document.querySelectorAll(_.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);p(e,n,o),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?d(e,t,n):function(e,t,n,o){t.querySelector(".".concat(n.id,"-error")).textContent=o,n.classList.add(e.errorClass)}(e,t,n,n.validationMessage)}(e,t,r),p(e,n,o)}))}))}(_,e)})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(t){var n,o,r=(o=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){s=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return i}}(n,o)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];document.querySelector(".profile__title").textContent=c.name,document.querySelector(".profile__description").textContent=c.about,document.querySelector(".profile__image").setAttribute("style","background-image: url(".concat(c.avatar,")")),a.forEach((function(t){var n=u(t,l,s,e,c._id);j.append(n)}))})).catch((function(e){console.log(e)}))})();