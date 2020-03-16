var shiki = 'https://shikimori.one'

formRender();
function formRender() {
  let root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.querySelector('body').prepend(root);

  let form = document.createElement('form');
  root.append(form);

  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  form.append(input);

  let content = document.createElement('div');
  content.setAttribute('id', 'content');
  root.append(content);
}

document.forms[0].addEventListener('submit', function (event) {
  event.preventDefault();
  let data = document.querySelector('input[type="text"]').value;
  animeRender(data);
  this.reset();
})

function animeRender(id) {
  fetch(shiki + '/api/animes?&limit=10&search=' + id)
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        addAnime(element);
      });
    });
}

function addAnime(data) {
        let item = document.createElement('div');
        item.className = 'item';
        content.append(item);

        let img = document.createElement('img');
        img.setAttribute('src', shiki + data.image.preview);
        item.append(img);

        let nameRus = document.createElement('h3');
        nameRus.textContent = `${data.russian}`;
        item.append(nameRus);
        if(data.russian == '') {
          nameRus.textContent = `${data.name}`;
        }

        let itemInfo = document.createElement('div');
        itemInfo.className = 'itemInfo';
        item.append(itemInfo);

}

animeRender('12')