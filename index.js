var baseUrl = 'https://shikimori.one';
fetch(baseUrl + `/api/animes?&limit=15&status=latest`)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      addItem(element);
    });
  });

document.forms[0].addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('content').innerHTML = '';
  let text = document.forms[0].querySelector('input[type="text"]').value;
  search(text);
  this.reset();
})

function search(text) {
  let option
  fetch(baseUrl + `/api/animes?&rating=g&limit=15&search=${text}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        addItem(element);
      });
    });
}

function addItem(data) {
  let item = document.createElement('div');
  item.className = 'item';
  content.append(item);

  let itemWrapper = document.createElement('div');
  itemWrapper.className = 'itemWrapper';
  item.append(itemWrapper);

  itemWrapper.addEventListener('click', function (event) {
    addPopup(data);
  })

  let imageWrapper = document.createElement('div');
  imageWrapper.className = 'imageWrapper';
  itemWrapper.append(imageWrapper);

  let img = document.createElement('img');
  img.setAttribute('src', baseUrl + data.image.original);
  imageWrapper.append(img);

  let name = document.createElement('h3');
  if (data.russian !== '') {
    name.textContent = data.russian;
  } else {
    name.textContent = data.name;
  }
  itemWrapper.append(name);
}

function addPopup(data) {
  let popup = document.createElement('div');
  popup.id = 'popup';
  root.before(popup);

  let popupWrapper = document.createElement('div');
  popupWrapper.className = 'popupWrapper';
  popup.append(popupWrapper);

  let delPopup = document.createElement('span');
  delPopup.classList = 'delPopup fas fa-times';
  popupWrapper.append(delPopup);

  delPopup.addEventListener('click', function () {
    popup.remove();
  })

  fetch(baseUrl + `/api/animes/${data.id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let name = document.createElement('h1');
      name.textContent = data.name;
      popupWrapper.append(name);

      let nameRu = document.createElement('h2');
      nameRu.textContent = data.russian;
      popupWrapper.append(nameRu);

      let img = document.createElement('img');
      img.className = 'cover';
      img.setAttribute('src', baseUrl + data.image.original);
      popupWrapper.append(img);

      let description = document.createElement('p');
      description.textContent = 'Описание: ' + data.description.replace(/\[(.*?)\]/g, '');
      popupWrapper.append(description);
    });
}