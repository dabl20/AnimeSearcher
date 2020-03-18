var baseUrl = 'https://shikimori.one';

siteRender();
function siteRender() {
  let root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.querySelector('body').prepend(root);

  let form = document.createElement('form');
  root.append(form);

  let siteName = document.createElement('h1');
  siteName.setAttribute('id', 'siteName');
  siteName.textContent = 'ShikiSearcher';
  form.append(siteName);

  let input = document.createElement('input');
  input.setAttribute('class', 'fas');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', ' Искать...');
  input.setAttribute('maxlength', '70');
  input.setAttribute('required', '');
  input.setAttribute('autofocus', '');
  form.append(input);

  let content = document.createElement('div');
  content.setAttribute('id', 'content');
  root.append(content);

  fetch(baseUrl + `/api/animes?&limit=50&status=latest`)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      addItem(element);
    });
  });
}

document.forms[0].addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('content').innerHTML = '';
  let data = document.querySelector('input[type="text"]').value;
  contentRender(data);
  this.reset();
})

function addItem(data) {
  let item = document.createElement('div');
  item.className = 'item';
  content.append(item);

  let itemWrapper = document.createElement('div');
  itemWrapper.className = 'itemWrapper';
  item.append(itemWrapper);

  let img = document.createElement('img');
  img.setAttribute('src', baseUrl + data.image.preview);
  itemWrapper.append(img);

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