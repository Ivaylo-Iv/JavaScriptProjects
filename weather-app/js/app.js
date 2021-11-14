// Selectors
let input = document.getElementById("search");
let currentSearchDiv = document.getElementById("current-search");
let saved = document.getElementsByClassName("saved")[0];
let btnSave = document.getElementById("saveRegion");
let api = "Your API key here.";
let cityIn;
let lastSearch;
let date;
let flag;

setSaved(JSON.parse(localStorage.getItem("cities")));
// Event handlers
input.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    if (passCheck(input.value)) {
      await request(input.value);
      setCurrentSearch(data);
    }
  }
});

btnSave.addEventListener("click", (e) => {
  addToSaved();
});

// Functions
async function request(city) {
  if (typeof city === "string" && city) {
    try {
      let response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
      );
      if (!response.ok) {
        throw new Error("Invalid request");
      } else {
        date = new Date();

        input.placeholder = "Search a city";
        input.value = "";
        data = await response.json();
        cityIn = data.name;
        return;
      }
    } catch (err) {
      input.placeholder = "Please search for a valid city 😩";
      input.value = "";
    }
  } else {
    input.placeholder = "Please search for a valid city 😩";
  }
}

function setCurrentSearch(data) {
  currentSearchDiv.innerHTML = `<div class="current-head">
      <div class="img-temp">
        <img src=" http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="" />
        <h1>${Math.round(data.main.temp)}&#xb0;</h1>
      </div>
      <div id="city">${data.name}</div>
    </div>
    <div class="current-desc">
      <h2 id="desc">Weather description: ${data.weather[0].description}.</h2>
    </div>
    <div class="current-details">
      <div class="wind-speed">
        <h3><i class="fas fa-wind"></i><span class="text-i">${Math.round(
          data.wind.speed
        )} km/h</span></h3>
      </div>
      <div class="temp">
        <h3 id="temp-min">
          <i class="fas fa-thermometer-quarter"></i
          ><i class="fas fa-long-arrow-alt-down"></i
          ><span class="text-i">${Math.round(
            data.main["temp_min"]
          )}&#xb0;</span>
        </h3>
        <h3 id="temp-max">
          <i class="fas fa-thermometer-full"></i
          ><i class="fas fa-long-arrow-alt-up"></i
          ><span class="text-i">${Math.round(
            data.main["temp_max"]
          )}&#xb0;</span>
        </h3>
      </div>
      <div id="airH">
        <h3><i class="fas fa-water"></i><span class="text-i">${
          data.main.humidity
        }%</span></h3>
      </div>
    </div>`;
}

async function addToSaved() {
  if (countChecker()) {
    return;
  }
  if (checkSaved(cityIn)) {
    return;
  }
  if (!passCheck(cityIn)) {
    await request(cityIn);

    setCurrentSearch(data);
  }
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  let country = regionNames.of(data.sys.country);
  let savedEements = document.createElement("div");
  savedEements.classList.add("saved-el");
  savedEements.innerHTML = `<div class="img-temp-saved">
          <img src=" http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" alt="" />
          <h1>${Math.round(data.main.temp)}&#xb0;</h1>
        </div>
        <div id="city-saved">${cityIn}/${country}</div>
        <button id="remove-btn">Remove</button>`;
  saved.style.padding = 0;
  if (!flag) {
    flag = 1;
    saved.innerHTML = "";
  }
  savedEements.addEventListener("click", async function (e) {
    if (e.target.id === "remove-btn") {
      const c = e.target.parentElement.children[1].innerText.split(`/`)[0];
      const l = JSON.parse(localStorage.getItem("cities"));
      const index = l.indexOf(c);
      if (index > -1) {
        l.splice(index, 1);
      }
      if (l.length == 0) {
        setHomeText();
      }
      localStorage.setItem("cities", JSON.stringify(l));
      e.target.parentElement.remove();
    } else {
      await request(e.target.children[1].innerText.split("/")[0]);
      setCurrentSearch(data);
    }
  });
  saved.appendChild(savedEements);
}

function passCheck(city) {
  input.placeholder = "Search a city";

  if (cityIn) {
    if (cityIn === city) {
      if (10000 < new Date() - date) {
        input.value = "";
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function checkSaved(c) {
  if (!localStorage.getItem("cities")) {
    localStorage.setItem("cities", JSON.stringify([c]));
  } else {
    const temp = JSON.parse(localStorage.getItem("cities"));
    if (temp.includes(c)) {
      return true;
    } else {
      temp.push(c);
      localStorage.setItem("cities", JSON.stringify(temp));
      return false;
    }
  }
}

async function setSaved(p) {
  if (!p) {
    return;
  } else {
    p.forEach(async function (town) {
      await request(town);
      let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      let country = regionNames.of(data.sys.country);
      let savedEements = document.createElement("div");

      savedEements.classList.add("saved-el");
      savedEements.innerHTML = `<div class="img-temp-saved">
          <img src=" http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" alt="" />
          <h1>${Math.round(data.main.temp)}&#xb0;</h1>
        </div>
        <div id="city-saved">${cityIn}/${country}</div>
        <button id="remove-btn">Remove</button>`;
      saved.style.padding = 0;
      if (!flag) {
        flag = 1;
        saved.innerHTML = "";
      }
      savedEements.addEventListener("click", async function (e) {
        if (e.target.id === "remove-btn") {
          const c = e.target.parentElement.children[1].innerText.split(`/`)[0];
          const l = JSON.parse(localStorage.getItem("cities"));
          const index = l.indexOf(c);
          if (index > -1) {
            l.splice(index, 1);
          }
          if (l.length == 0) {
            setHomeText();
          }
          localStorage.setItem("cities", JSON.stringify(l));
          e.target.parentElement.remove();
        } else {
          await request(e.target.children[1].innerText.split("/")[0]);
          setCurrentSearch(data);
        }
      });
      saved.appendChild(savedEements);
    });
  }
}

function setHomeText() {
  flag = 0;
  saved.innerHTML = `<h2 class="text">Nothing to display here...</h2>
          <p class="sub-t">Save some cities to view them later</p>`;
}

function countChecker() {
  if (saved.children.length == 10) {
    return true;
  }
}
