import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import SignupPage from "./signup-page.js";
import STORE from "../store.js";
import { input } from "../components/input.js";
import { login } from "../services/session-services.js";


function render() {
    const { loginError } = this.state;
  return `
  <div>
  <header class="header"><h2>Login</h2></header>
    <main class="section">
      <section class="container">
        <form class="flex flex-column gap-4 mb-4 js-login-form">
        <div class="inputs-space">
          ${input({
            // label: "email",
            id: "email",
            name: "email",
            placeholder: "email",
            type: "email",
            required: true,
            // value: "test3@mail.com",
            // class: "input"
          })}


          ${input({
            // label: "password",s
            id: "password",
            name: "password",
            placeholder: "password",
            type: "password",
            required: true,
            // value: "123456",
          })}
          ${
            loginError
              ? `<p class="text-center error-300">${loginError}</p>`
              : ""
          }
          </div>
          <footer class="footer">
            <a href="#" class="block text-center" id="signup">Signup</a>
            <button class="login-button">Login</button>
          </footer>
        </form>
      </section>
    </main>
    </div>
  `
  
}

function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      const { email, password } = event.target.elements;

      const credentials = {
        email: email.value,
        password: password.value,
      };

      const user = await login(credentials);
      STORE.user = user
      await STORE.fetchContacts()
      DOMHandler.load(HomePage)

    } catch (error) {
      this.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}
const gotoSignup = () => {
  const signupButton = document.querySelector("#signup");
  signupButton.addEventListener("click", async () => {
    try{ 
      await DOMHandler.load(SignupPage);
    }catch (error){
      console.log(error);
    };
  });
};

const LoginPage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this);
    gotoSignup.call(this)
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
// export credentials
