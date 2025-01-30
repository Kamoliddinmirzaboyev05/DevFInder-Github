document.addEventListener("DOMContentLoaded", () => {
  const mode = document.querySelector(".mode");
  const body = document.querySelector("body");
  const input = document.querySelector(".input");
  const searchBtn = document.querySelector(".searchBtn");
  const mainWindow = document.querySelector(".mainWindow");
  let username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "Kamoliddinmirzaboyev05";

  // search function
  let apiLink = `https://api.github.com/users/${username}`;
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("username", input.value);
    username = input.value != "" ? input.value : "Kamoliddinmirzaboyev05";
    apiLink = `https://api.github.com/users/${username}`;
    getData(apiLink);
  });

  // light-dark mode change function start

  const changeMode = (darkMode) => {
    if (darkMode == "false") {
      body.classList.add("dark");
      mode.innerHTML = `<p>Dark</p>
          <img src="img/moon.svg" alt="" />`;
    } else {
      body.classList.remove("dark");
      mode.innerHTML = `<p>Light</p>
          <img src="img/sun.svg" alt="" />`;
    }
  };

  // light-dark mode change function end

  let dark = localStorage.getItem("mode")
    ? localStorage.getItem("mode")
    : "false";
  changeMode(dark);
  mode.addEventListener("click", () => {
    if (dark == "true") {
      dark = "false";
      changeMode(dark);
    } else {
      dark = "true";
      changeMode(dark);
    }
    localStorage.setItem("mode", dark);
  });

  // get data function
  const getData = async (link) => {
    const req = await fetch(link);
    const data = await req.json();
    writeData(data);
    console.log(data);
  };

  getData(apiLink);

  const writeData = (DB) => {
    let twitter =
      DB.twitter_username != null ? DB.twitter_username : "Not Available";
    let name = String(DB.name).slice(0, 10);
    let blog = DB.blog != "" ? DB.blog : "Not Available";
    let data = String(DB.created_at).slice(0, 10);
    blog = blog.slice(0, 25);
    mainWindow.innerHTML = `
      <div class="mainImg">
          <img src="${DB.avatar_url}" alt="" />
        </div>
        <div class="mainData">
        <div class="headPart">
        <div class="mainMobileImg">
          <img src="${DB.avatar_url}" alt="" />
        </div>
        <div class="headData">
        <div class="title">
            <h2 class="name">${name}</h2>
            <div class="date">
              <p>Joined ${data}</p>
            </div>
          </div>
          <p class="username">@${DB.login}</p>
      </div>
      </div> 
          <p class="bio">${DB.bio}</p>
          <div class="profile">
            <div class="col">
              <p class="key">Repos</p>
              <p class="value">${DB.public_repos}</p>
            </div>
            <div class="col">
              <p class="key">Followers</p>
              <p class="value">${DB.followers}</p>
            </div>
            <div class="col">
              <p class="key">Following</p>
              <p class="value">${DB.following}</p>
            </div>
          </div>
          <div class="userData">
            <div class="col">
              <p class="url"><i class="fa-solid fa-location-dot"></i> ${DB.location}</p>
              <p class="url"><i class="fa-solid fa-link"></i><a target="_blank" href="${DB.blog}"> ${blog} </a></p>
            </div>
            <div class="col">
              <p class="url"><i class="fa-brands fa-twitter"></i> ${twitter}</p>
              <p class="url"><i class="fa-solid fa-city"></i>    ${DB.login}</p>
            </div>
          </div>
        </div>
    `;
  };
}); //DOMContentLoaded
