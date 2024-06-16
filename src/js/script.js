let BaseURL = "http://localhost:5500";

const cardsContainer = document.querySelector(".cards__container");

const getApiDataWithCallBack = async (endPoint, cb) => {
  let response = await fetch(`${BaseURL}/${endPoint}`).then((res) =>
    res.json()
  );
  cb(response);
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
              <p>${item.properties}</p>
              <p class="explore">
                Explore Now <i class="fa-solid fa-arrow-right"></i>
              </p>
              <button>Delete</button>
            </div>
          </div>
          `;
  });
});
