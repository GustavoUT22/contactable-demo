import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";
import { createContact } from "../services/contact-services.js";
import { input, selectInput} from "../components/input.js";
import { logout } from "../services/session-services.js";
import LoginPage from "./login-page.js";

function render() {
    return `
      <header class="header">
      <h2>Create new contact </h2>
      <a href="#" id="logout" class="block text-center js-logout-link">Logout</a>
      </header>
        <main class="main">
          <section class="container">
            <form class="flex flex-column gap-4 mb-4 js-login-form">
              <div class="inputs-space section">
                ${input({
                  id: "name",
                  name: "name",
                  type: "text",
                  required: true,
                  value: "",
                })}
  
                ${input({
                  id: "number",
                  name: "number",
                  placeholder: "Number",
                  type: "number",
                  required: true,
                  value: "",
                })}
  
                ${input({
                  id: "email",
                  name: "email",
                  placeholder: "email",
                  type: "email",
                  required: true,
                  value: "",
                })}
  
                ${selectInput({
                  id: "relation",
                  name: "relation",
                  options: ["Family", "Friends", "Work", "Acquaintance"],
                  required: true,
                  value: "",
                })}
  
                
              </div>
              <footer class="footer">
                <a href="#" class="block text-center" id="cancelcreatecontact">Cancel</a>
                <button class="login-button">Save</button>
              </footer>
            </form>
          </section>
      </main>
  `;
  }

  const listenLogout = () => {
    const logoutButton = document.querySelector("#logout");
    logoutButton.addEventListener("click", async () => {
      try {
        await logout();
        DOMHandler.load(LoginPage);
      } catch (error) {
        console.log(error);
      }
    });
  };

  function listenSubmitForm() {
    const form = document.querySelector(".js-login-form");
  
    form.addEventListener("submit", async (event) => {
      try {
        event.preventDefault();
  
        const { name, email, number, relation } = event.target.elements;
  
        const newContactData = {
          name: name.value,
          email: email.value,
          number: number.value,
          relation: relation.value
        };
  
        const user = await createContact(newContactData);
        STORE.user = user;
        await STORE.fetchContacts();
  
        DOMHandler.load(HomePage);
      } catch (error) {
        this.state.loginError = error.message;
        DOMHandler.reload();
      }
    });
  }

  const gotoHomePage = () => {
    const signupButton = document.querySelector("#cancelcreatecontact");
    signupButton.addEventListener("click", async () => {
      try{ 
        await DOMHandler.load(HomePage);
      }catch (error){
        console.log(error);
      };
    });
  };
  
  const NewContactPage = {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenSubmitForm.call(this),
      gotoHomePage.call(this)
      listenLogout.call(this)
    },
     state: {
      loginError: null,
    },
  };
  
  
  
  export default NewContactPage;
  