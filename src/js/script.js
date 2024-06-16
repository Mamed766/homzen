let BaseURL = "http://localhost:5500";

const cardsContainer = document.querySelector(".cards__container");

const getApiDataWithCallBack = async (endPoint, cb) => {
  let response = await fetch(`${BaseURL}/${endPoint}`).then((res) =>
    res.json()
  );
  cb(response);
};

const PostApiData = async (endPoint, data) => {
  let response = await fetch(`${BaseURL}/${endPoint}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
};

const DeleteApiDataById = async (endPoint, id) => {
  let response = await fetch(`${BaseURL}/${endPoint}/${id}`, {
    method: "DELETE",
  });
  return response;
};

getApiDataWithCallBack("data", (data) => {
  data.map((item) => {
    cardsContainer.innerHTML += `
    <div class="cards__container--card">
            <div class="cards__container--card__img">
              <img
                src="${item.imageSrc}"
                alt=""
              />
            </div>
            <div class="cards__container--card__content">
              <h2>${item.city}</h2>
              <p>${item.properties} properties</p>
              <p class="explore">
                Explore Now <i class="fa-solid fa-arrow-right"></i>
              </p>
              <button class="delete" data-id=${item.id}>Delete</button>
            </div>
          </div>
          `;

    const DELETE_BTN = document.querySelectorAll(".delete");

    DELETE_BTN &&
      DELETE_BTN.forEach((btn) =>
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          let attrId = e.target.getAttribute("data-id");

          DeleteApiDataById("data", attrId);
        })
      );
  });
});

const imgSrc = document.querySelector("#imagesrc");
const city = document.querySelector("#city");
const properties = document.querySelector("#properties");

const CREATE__CARD = document.querySelector("#create");

CREATE__CARD &&
  CREATE__CARD.addEventListener("click", (e) => {
    e.preventDefault();

    const cardData = {
      imageSrc: imgSrc.value,
      city: city.value,
      properties: properties.value,
    };

    PostApiData("data", cardData);
  });
