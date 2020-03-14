var shiki = 'https://shikimori.one'

formRender();

function formRender() {
  let root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.querySelector('body').prepend(root);

  let form = document.createElement('form');
  //form.setAttribute('target', '_self')
  root.append(form);

  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  form.append(input);
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
        let anime = document.createElement('div');
        anime.className = 'anime';
        root.append(anime);

        let img = document.createElement('img');
        img.setAttribute('src', shiki + data.image.x96);
        anime.append(img);

        let name = document.createElement('p');
        name.textContent = `${data.russian} / ${data.name} [${data.kind}]`;
        anime.append(name);

        let episodes = document.createElement('p');
        episodes.textContent = `Серий ${data.episodes}`;
        anime.append(episodes);

        let aired = document.createElement('p');
        aired.textContent = data.aired_on;
        anime.append(aired);

        let status = document.createElement('p');
        status.textContent = `${data.status} ${data.released_on}`;
        anime.append(status);

        let score = document.createElement('p');
        score.textContent = data.score;
        anime.append(score);

        console.log(data)
}

animeRender('1')
/*
0:
id: 36936
name: "Mirai no Mirai"
russian: "Мирай из будущего"
image: {original: "/system/animes/original/36936.jpg?1578360010", preview: "/system/animes/preview/36936.jpg?1578360010", x96: "/system/animes/x96/36936.jpg?1578360010", x48: "/system/animes/x48/36936.jpg?1578360010"}
url: "/animes/36936-mirai-no-mirai"
kind: "movie"
score: "7.41"
status: "released"
episodes: 1
episodes_aired: 1
aired_on: "2018-07-20"
released_on: null
*/