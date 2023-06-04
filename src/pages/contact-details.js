import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";
import { deleteContact } from "../services/contact-services.js";
import UpdateContactPage from "./update-contact.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/session-services.js";

function render() {
    const currentContact = STORE.current_contact
    console.log(currentContact)
    return `
      <header class="header"><h2>Contact Detail</h2>
      <a href="#" id="logout" class="block text-center js-logout-link">Logout</a>
      </header>
        <main class="main">
          <section class="container">
              <div class="flex-contact">
                <div class="contact-detail"><img src="assets/images/placeholder_img.png"></div>
                <div class="contact-detail heading--md">${currentContact.name}</div>
                <div class="contact-detail overline">${currentContact.relation}</div>
                <div>Number:  ${currentContact.number}</div>
                <div>Email:  ${currentContact.email}</div>
              </div>
              <footer class="footer">
                <a class="block text-center" id="detail-back">Back</a>
                <a class="block text-center" id="contact-delete">Delete</a>
                <a class="block text-center" id="contact-edit">Edit</a>
              </footer>
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

  const back = () => {
    const loginButton = document.querySelector("#detail-back");
    loginButton.addEventListener("click", async () => {
      try{ 
        await DOMHandler.load(HomePage);
      }catch (error){
        console.log(error);
      };
    });
  };

  const listenDeleteContact = () => {
    const loginButton = document.querySelector("#contact-delete");
    loginButton.addEventListener("click", async () => {
      try{ 
        await deleteContact(STORE.current_contact.id)
        await STORE.fetchContacts();
        DOMHandler.load(HomePage);
      }catch (error){
        console.log(error);
      };
    });
  };

  const listenUpdateContact = () => {
    const loginButton = document.querySelector("#contact-edit");
    loginButton.addEventListener("click", async () => {
      try{ 
        ///await STORE.fetchContacts();
        DOMHandler.load(UpdateContactPage);
      }catch (error){
        console.log(error);
      };
    });
  };

  const ContactDetail = {
    toString() {
      return render.call(this);
    },
    addListeners() {
      back.call(this)
      listenDeleteContact.call(this)
      listenUpdateContact.call(this)
      listenLogout.call(this)
    }
  };
  
  export default ContactDetail;
  