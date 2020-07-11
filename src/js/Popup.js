import { baseUrl } from "./URL";

export function addPopup(data) {
  document.body.setAttribute("style", "overflow:hidden");

  const root = document.getElementById("root");
  const popup = document.createElement("div");
  popup.id = "popup";
  root.before(popup);

  const popupWrapper = document.createElement("div");
  popupWrapper.className = "popupWrapper";
  popup.append(popupWrapper);

  const delPopup = document.createElement("span");
  delPopup.classList = "delPopup fas fa-times";
  popupWrapper.append(delPopup);

  delPopup.addEventListener("click", () => {
    document.body.setAttribute("style", "overflow:auto");
    popup.remove();
  });

  fetch(baseUrl + `/api/animes/${data.id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const name = document.createElement("h1");
      name.textContent = data.name;
      popupWrapper.append(name);

      const nameRu = document.createElement("h2");
      nameRu.textContent = data.russian;
      popupWrapper.append(nameRu);

      const img = document.createElement("img");
      img.className = "cover";
      img.setAttribute("src", baseUrl + data.image.original);
      popupWrapper.append(img);

      const description = document.createElement("p");
      description.textContent =
        "Описание: " + data.description.replace(/\[(.*?)\]/g, "");
      popupWrapper.append(description);
    });
}
