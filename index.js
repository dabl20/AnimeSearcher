var baseUrl = 'https://shikimori.one';

fetch(baseUrl + `/api/animes?&limit=50&status=latest`)
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
  contentRender(text);
  this.reset();
})

function addItem(data) {
  let item = document.createElement('div');
  item.className = 'item';
  content.append(item);

  let itemWrapper = document.createElement('div');
  itemWrapper.className = 'itemWrapper';
  item.append(itemWrapper);

  let imageWrapper = document.createElement('div');
  imageWrapper.className = 'imageWrapper';
  itemWrapper.append(imageWrapper);

  let img = document.createElement('img');
  img.setAttribute('src', baseUrl + data.image.preview);
  imageWrapper.append(img);

  let name = document.createElement('h3');
  if (data.russian == '') {
    name.textContent = `${data.name}`;
  } else {
    name.textContent = `${data.russian}`;
  }
  itemWrapper.append(name);
}

function contentRender(text) {
  fetch(baseUrl + `/api/animes?&limit=50&search=${text}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        addItem(element);
      });
    });
}