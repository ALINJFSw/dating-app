const Work_place = {};
Work_place.home_work = {};

Work_place.getData = (apiURL) => {
  return axios
    .get(apiURL)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

Work_place.postData = (apiURL, data, header) => {
  return axios
    .post(apiURL, data, header)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

Work_place.home_work.showNav = false;
Work_place.home_work.showPhoneNav = () => {
  const Phonenav = document.getElementById("phoneNav");
  if (Work_place.showNav == false) {
    Phonenav.style.display = "block";
    Work_place.showNav = true;
  } else {
    Phonenav.style.display = "none";
    Work_place.showNav = false;
  }
};

Work_place.home_work.popular = `
    <h1>Datting app</h1>
    <h2>Love At First Chat</h2>
    <a href="register.html" class="primary-button">Register</a>
`;

Work_place.home_work.HomePageRendering = async () => {
  if (!localStorage.getItem("token")) {
    console.log("test");
    const webLinks = document.getElementById("web-links");
    const phoneLinks = document.getElementById("phoneNav");
    const navLinks1 = document.getElementById("ul1");
    const navLinks2 = document.getElementById("ul2");
    const main = document.getElementById("main");
    const userContent = document.getElementById("user-content");
    main.removeChild(userContent);
    webLinks.removeChild(navLinks2);
    phoneLinks.removeChild(navLinks1);
    const welcome = document.createElement("div");
    welcome.className = "main-title";
    welcome.innerHTML = Work_place.home_work.popular;
    main.appendChild(welcome);
  } else {
    const token = localStorage.getItem("token");
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
    const name1 = document.getElementById("name1");
    const name2 = document.getElementById("name2");
    const data = await Work_place.postData(
      "http://127.0.0.1:8000/api/get-user",
      "",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (data.user.profile_image != "image") {
      image1.src = data.user.profile_image;
      image2.src = data.user.profile_image;
    }
    name1.innerHTML = data.user.first_name + " " + data.user.last_name;
    name2.innerHTML = data.user.first_name + " " + data.user.last_name;
  }
};

Work_place.renderUsers = (DATA) => {
  const Result = document.getElementById("result-search");
  DATA.map((data, index) => {
    const user = document.createElement("div");
    user.className = "user";
    user.innerHTML = ` <img src="./img/Unknown_person.jpg" alt="" class="user__image" />
      <div>
        <h5>${data.first_name}  ${data.last_name}</h5>
        <div class="buttons">
         <button id="favorite${index}" class="favorite">Favorite</button>
         <button id="block${index}" class="block">block</button>
         <button id="message${index}" class="message">message</button>
        </div>
        <h6>${!!data.bio ? data.bio : "hello im a new user "}</h6>
      </div>`;
    Result.appendChild(user);
    const favorite = document.getElementById("favorite" + index);
    const block = document.getElementById(`block${index}`);
    const message = document.getElementById(`message${index}`);
    favorite.addEventListener("click", () => Work_place.favorite(data.id));
    block.addEventListener("click", () => Work_place.block(data.id));
    message.addEventListener("click", () => Work_place.message(data.id));
  });
};

Work_place.block = async (target_id) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("target_id", target_id);
  const response = await Work_place.postData(
    "http://127.0.0.1:8000/api/block",
    formData,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  console.log(response);
};
Work_place.favorite = async (target_id) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("target_id", target_id);
  const response = await Work_place.postData(
    "http://127.0.0.1:8000/api/add-to-favorite",
    formData,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  console.log(response);
};
Work_place.message = (target_id) => {
  localStorage.setItem("target_id", target_id);
  window.location.href = "./create-message.html";
};

Work_place.home_work.getSearch = async () => {
  const token = localStorage.getItem("token");
  const search = document.getElementById("search").value;
  const ageFilter = document.getElementById("age-filter").checked;
  const locationFilter = document.getElementById("location-filter").checked;
  const age = ageFilter ? "age" : "";
  const location = locationFilter ? "location" : "";
  const name = !!search ? search : "";
  const formData = new FormData();
  formData.append("name", name);
  formData.append("age", age);
  formData.append("city", location);
  const DATA = await Work_place.postData(
    "http://127.0.0.1:8000/api/get-users",
    formData,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  Work_place.renderUsers(DATA.users);
};

Work_place.send_message = async () => {
  const message = document.getElementById("message").value;
  const target_id = localStorage.getItem("target_id");
  const formData = new FormData();
  const token = localStorage.getItem("token");
  formData.append("target_id", target_id);
  formData.append("message", message);
  const response = await Work_place.postData(
    "http://127.0.0.1:8000/api/send-message",
    formData,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  window.location.href = "./index.html";
};

Work_place.getNotifications = async () => {
  const token = localStorage.getItem("token");
  const notification = document.getElementById("notification");
  const DATA = await Work_place.postData(
    "http://127.0.0.1:8000/api/get-notifications",
    "",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  console.log(DATA);
  DATA.message.map(async (data) => {
    const formData = new FormData();
    formData.append("id", data.user_id);
    const user = await Work_place.postData(
      "http://127.0.0.1:8000/api/get-user-by-id",
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const sender = user.user;
    console.log(sender);
    const sentMessage = `${sender.first_name} ${sender.last_name} sent you a new message`;
    const blockMessage = `${sender.first_name} ${sender.last_name} blocked you`;
    const favoriteMessage = `${sender.first_name} ${sender.last_name} added you a favorit`;
    let imageSRC = "./img/Unknown_person.jpg";
    if(sender.profile_image != "image"){
      imageSRC = sender.profile_image;
    }
    let message = favoriteMessage;
    if (data.type == "message") {
      message = sentMessage;
    } else if (data.type == "block") {
      message = blockMessage;
    }
    const note = document.createElement("div");
    note.className = "main";
    note.innerHTML = ` <div class="noti">
    <img class="avatar" src="./img/Unknown_person.jpg" alt="">
    ${message}
    </div>
    <div class="reply">
        <i class="fa fa-reply"></i>
    </div>`;
    notification.appendChild(note);
  });
};




