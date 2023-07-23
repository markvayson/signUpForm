let FORM;
let users = [
  {
    firstName: "Mark",
    lastName: "Vayson",
    emailAdd: "mark@example.com",
    phoneNumber: "123 123 123",
    userPass: "password321",
  },
];

const preloader = document.getElementById("preloader");
const formOutput = document.getElementById("form-output");
const formInput = document.getElementById("form-input");
const formDiv = document.getElementById("formDiv");
const sidebar = document.getElementById("sidebar");
const form = document.getElementById("form");
const formLogin = document.getElementById("form-login");
const loading = document.getElementById("loading");
const userPassword = document.getElementById("userPass");
const confirmPassword = document.getElementById("confirmPass");
const error = document.getElementById("error-password");
const errorLogin = document.getElementById("error-login");
confirmPassword.addEventListener("input", checkPass);

const logInText = document.getElementById("logInText");
const signUpText = document.getElementById("signUpText");

function checkPass() {
  let user = userPassword.value;
  let userLength = user.length;

  let confirm = confirmPassword.value;
  let confirmLength = confirm.length;

  if (userLength !== confirmLength && user !== confirm) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }
}

function returnForm() {
  form.reset();
}

function showForm() {
  sidebar.style.opacity = 0;
  formDiv.style.opacity = 1;
  formInput.style.opacity = 1;

  setTimeout(() => {
    sidebar.style.display = "none";
    formDiv.style.display = "flex";
    formInput.style.display = "flex";
  }, 300);
}

function whatForm(e) {
  FORM = e;
  switch (FORM) {
    case "formInput":
      preloader.style.opacity = 1;
      preloader.style.display = "flex";
      formOutput.style.opacity = 0;

      setTimeout(() => {
        formInput.style.opacity = 1;
        formInput.style.display = "flex";
        preloader.style.opacity = 0;
        preloader.style.display = "none";
        formOutput.style.display = "none";
      }, 600);
      break;
    case "formOutput":
      formInput.style.opacity = 0;
      preloader.style.opacity = 1;
      preloader.style.display = "flex";
      setTimeout(() => {
        preloader.style.opacity = 0;
        formOutput.style.opacity = 1;
        formOutput.style.display = "flex";
        preloader.style.display = "none";
        formInput.style.display = "none";
      }, 600);
      break;
    case "formLogin":
      formLogin.style.opacity = 1;
      formInput.style.opacity = 0;
      preloader.style.opacity = 1;
      preloader.style.display = "flex";
      setTimeout(() => {
        preloader.style.opacity = 0;
        formLogin.style.display = "flex";
        preloader.style.display = "none";
        formInput.style.display = "none";
      }, 600);
      break;
  }
}

function postData() {
  const formData = new FormData(form);
  const userName = document.getElementById("created-name");
  const userEmail = document.getElementById("email-address");
  const confirm = document.getElementById("confirmPass");

  let obj = new Object();
  let entries = formData.entries();

  for (let [name, value] of formData.entries()) {
    obj[name] = value;
  }

  users.push(obj);
  const firstFour = obj["emailAdd"].substring(0, 4);

  const domain = obj["emailAdd"].substring(obj["emailAdd"].indexOf("@") + 1);

  userName.textContent = ` ${obj["firstName"]} ${obj["lastName"]}`;
  userEmail.textContent = ` ${firstFour}***@${domain}`;

  if (confirm.value === obj["userPass"]) {
    signUpText.classList.remove("hidden");
    logInText.classList.add("hidden");
    whatForm("formOutput");
  }
  return false;
}

function logIn() {
  const loginDetails = document.getElementById("login-details");
  const loginData = new FormData(loginDetails);
  const form = document.getElementById("form-login");
  const userName = document.getElementById("logged-name");

  let user = new Object();
  for (let [name, value] of loginData.entries()) {
    user[name] = value;
  }

  const foundUser = users.find((obj) => obj.emailAdd === user.emailAdd);

  const isUserRegistered = users.some((obj) => {
    return obj.emailAdd === user.emailAdd && obj.userPass === user.userPass;
  });

  if (isUserRegistered) {
    signUpText.classList.add("hidden");
    logInText.classList.remove("hidden");
    if (foundUser) {
      const firstName = foundUser.firstName;
      const lastName = foundUser.lastName;
      userName.textContent = `${firstName} ${lastName}`;
    }
    whatForm("formOutput");
    form.style.opacity = 0;
    setTimeout(() => {
      form.style.display = "none";
    }, 300);
  } else {
    errorLogin.style.display = "block";
  }

  return false;
}

window.onload = () => {
  preloader.style.display = "none";
  preloader.style.opacity = 0;
  // formInput.style.display = "none";
  // formInput.style.opacity = 0;
  formOutput.style.display = "none";
  formOutput.style.opacity = 0;
  // sidebar.style.opacity = 0;
  // sidebar.style.display = "none";
  error.style.display = "none";
  errorLogin.style.display = "none";
  formLogin.style.display = "none";
  formLogin.style.opacity = 0;

  setTimeout(() => {
    loading.style.opacity = 0;
  }, 300);
  loading.addEventListener("transitionend", () => {
    loading.style.display = "none";
  });
};
