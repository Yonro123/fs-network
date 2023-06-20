import { user, auth, logOut } from "./auth.js";

const buttonContainer = document.querySelector("#header__controlPanel");
const renderButton = () => {
  buttonContainer.innerHTML = "";

  const button = document.createElement("button");
  button.classList.add("header__button");

  if (user) {
    button.textContent = "LogOut";
    button.onclick = () => {
      logOut();
    };
  } else {
    button.textContent = "Login";
    button.onclick = () => {
      auth();
    };
  }

  buttonContainer.appendChild(button);
};

renderButton();

window.addEventListener("userChanged", () => {
  renderButton();
});
