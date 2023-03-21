const Auth = {};

Auth.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  const data = await Work_place.postData(
    "http://127.0.0.1:8000/api/login",
    formData,
    {}
  );
  localStorage.setItem("token", data.authorisation.token);
  window.location.href = "../frontend/index.html";
};

Auth.register = async () => {
  let gender = "male";
  const fname = document.getElementById("first_name").value;
  const lname = document.getElementById("last_name").value;
  const profile_image = "image";
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const male = document.getElementById("male").cheched;
  const female = document.getElementById("female").cheched;
  if (female) {
    gender = "female";
  }

  const formData = new FormData();
  formData.append("fname", fname);
  formData.append("lname", lname);
  formData.append("email", email);
  formData.append("profile_image", profile_image);
  formData.append("password", password);
  formData.append("gender", gender);
  formData.append("age", age);
  formData.append("city", city);

  const data = await Work_place.postData(
    "http://127.0.0.1:8000/api/register",
    formData,
    {}
  );
  localStorage.setItem("token", data.authorisation.token);
  window.location.href = "../frontend/index.html";
};

Auth.resetPassword = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rpassword = document.getElementById("rpassword").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const formData = new FormData();
  formData.append("email", email);
  if (password == rpassword) {
    formData.append("password", password);
  } else {
    return;
  }
  formData.append("age", age);
  formData.append("city", city);
  const response = Work_place.postData(
    "http://127.0.0.1:8000/api/reset-password",
    formData,
    {}
  );
};
