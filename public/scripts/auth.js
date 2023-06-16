import { now } from "mongoose";

const endpoint = "http://localhost:8080/api";

let user = null;

const auth = async () => {
  try {
    const response = await fetch(`${endpoint}/user/auth`, {
      method: "POST",
      headers: {
        "Contetn-type": "application/json",
      },
      body: JSON.stringify({
        email: "nurik@mail.ru",
        password: "123456",
      }),
    });

    if (!response.ok) {
      throw new Error("server error");
    }

    const data = await response.json();

    user = data;

    localStorage.setItem("user", JSON.stringify(user));

    const event = new CustomEvent("userChanged", { detail: data });

    window.dispatchEvent(event);
  } catch (error) {
    console.log("error: ", error);
  }
};

const logOut = () => {};

export { user, auth, logOut };
