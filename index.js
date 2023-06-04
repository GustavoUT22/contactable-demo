import { login , logout } from "./src/services/session-services.js";
import { createContact, deleteContact, showContact, editContact} from "./src/services/contact-services.js";
import { listContacts } from "./src/services/contact-services.js";
import DOMHandler from "./src/dom-handler.js";
import LoginPage from "./src/pages/login-page.js";
import HomePage from "./src/pages/home-page.js";
import { tokenKey } from "./src/config.js";
import STORE from "./src/store.js";

async function init() {
  const token = sessionStorage.getItem(tokenKey)

  if (!token) return DOMHandler.load(LoginPage)

    try {
 
      const token = sessionStorage.getItem(tokenKey); 

      if (!token) return DOMHandler.load(LoginPage)

      await STORE.fetchContacts();
      DOMHandler.load(HomePage);
    } catch (error) {
      sessionStorage.removeItem(tokenKey);
      DOMHandler.load(LoginPage);
    }
  }
  
  init();

