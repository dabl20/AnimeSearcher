import { baseUrl } from "./URL";
import { addItem } from "./Item";

document.forms[0].addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("content").innerHTML = "";
  const text = document.forms[0].querySelector('input[type="text"]').value;
  search(text);
  this.reset();
});

function search(text) {
  fetch(`${baseUrl}/api/animes?&rating=g&limit=15&search=${text}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        addItem(element);
      });
    });
}
