import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import STORE from "../store.js";
import { logout } from "../services/session-services.js";
import { ShowContacts } from "../components/show-contacts.js";
import NewContactPage from "./new-contact-page.js";
import { showContact, editContact } from "../services/contact-services.js";
import ContactDetail from "./contact-details.js";

function render() {
  const contacts = STORE.contacts;
  const favorites = STORE.favorite;
  return `<header class="header">
            <h2>Contactable</h2>
            <a href="#" id="logout" class="block text-center js-logout-link">Logout</a>
          </header>
          <main class="main">
            <section id="display-contacts" class="container">
            ${ShowContacts({ contacts: favorites, areFavorites: true })}
            
            ${ShowContacts({ contacts: contacts, areFavorites: false })}
            </section>
          </main>
          <footer class="footer" style="border-top:none";>
          <a href="#" id="newcontact" class="add-contact-icon">
            +
          </a>
        </footer>`
          ;
}

//========================================================
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

const listenCreateContact = () => {
  const newcontactButton= document.querySelector("#newcontact");
  newcontactButton.addEventListener("click", async () => {
    try {
      DOMHandler.load(NewContactPage);
    } catch (error) {
      console.log(error);
    }
  });
};

const listenFavorite = () => {
  const contact = document.querySelector("#display-contacts")
  console.log(contact)
  contact.addEventListener("click",async (event) => {
    
    const deleteElement = event.target.closest("[data-id]")
    if(!deleteElement) return

    const selectedContactId = deleteElement.dataset.id
    const contactSelected = await showContact(selectedContactId)
    try {
      await editContact(selectedContactId, !contactSelected.favorite)
      await STORE.fetchContacts();
      DOMHandler.load(HomePage);
    } catch (error) {
      console.log(error)
    }
  })
}

const listenContactDetails = () => {
  const contacts = document.querySelector("#display-contacts")
  console.log(contacts)
  contacts.addEventListener("click",async (event) => {
    event.preventDefault()
    const selectedContact = event.target.closest("[data-iddetails]")
    if(!selectedContact) return

    const selectedContactId = selectedContact.dataset.iddetails
    const selectedContactData = await showContact(selectedContactId)
    STORE.current_contact = selectedContactData
    DOMHandler.load(ContactDetail)
  })
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout.call(this)
    listenCreateContact.call(this)
    listenFavorite.call(this)
    listenContactDetails.call(this)
  },
};

export default HomePage;
