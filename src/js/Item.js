import { baseUrl } from "./URL";
import { addPopup } from "./Popup";

export function addItem(data) {
  const app = document.getElementById("content");
  const item = document.createElement("div");
  item.className = "item";
  app.append(item);

  const itemWrapper = document.createElement("div");
  itemWrapper.className = "itemWrapper";
  item.append(itemWrapper);

  itemWrapper.addEventListener("click", function () {
    addPopup(data);
  });

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "imageWrapper";
  itemWrapper.append(imageWrapper);

  const img = document.createElement("img");
  img.setAttribute("src", baseUrl + data.image.original);
  imageWrapper.append(img);

  const name = document.createElement("h3");
  if (data.russian !== "") {
    name.textContent = data.russian;
  } else {
    name.textContent = data.name;
  }
  itemWrapper.append(name);
}

fetch(`${baseUrl}/api/animes?&limit=15&status=latest`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      addItem(element);
    });
  });
