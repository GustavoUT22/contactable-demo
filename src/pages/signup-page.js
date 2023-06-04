import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import LoginPage from "./login-page.js";
import STORE from "../store.js";
import { createUser } from "../services/user-services.js";
import { input } from "../components/input.js";


function render() {
  const { signupError } = this.state;
  return  `
 <header class="header"><h2>Signup</h2>
    </header>
      <main class="section">
        <section class="container">
          <form class="flex flex-column gap-4 mb-4 js-signup-form">
            <div class="inputs-space">
              ${input({
                id: "email",
                name: "email",
                placeholder: "email",
                type: "email",
                required: true,
                value: "",
              })}


              ${input({
                id: "password",
                name: "password",
                placeholder: "password",
                type: "password",
                required: true,
                value: "",
              })}

              ${
                signupError
                  ? `<p class="text-center error-300">${signupError}</p>`
                  : ""
              }
            </div>
            <footer class="footer">
              <a href="" class="block text-center" id="login">Login</a>
              <button class="login-button">Create Account</button>
            </footer>
          </form>
        </section>
    </main>`
;
}
function listenSubmitForm() {
  const form = document.querySelector(".js-signup-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      const { email, password } = event.target.elements;

      const newCredentials = {
        email: email.value,
        password: password.value,
      };

      const user = await createUser(newCredentials);
      STORE.user = user;
      await STORE.fetchContacts();

      DOMHandler.load(HomePage);
    } catch (error) {
      this.state.signupError = error.message;
      DOMHandler.reload();
    }
  });
}

const gotoLogin = () => {
  const loginButton = document.querySelector("#login");
  loginButton.addEventListener("click", async () => {
    try{ 
      await DOMHandler.load(LoginPage);
    }catch (error){
      console.log(error);
    };
  });
};

const SignupPage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this),
    gotoLogin.call(this);
  },
  state: {
    signupError: null,
  },
};

export default SignupPage;