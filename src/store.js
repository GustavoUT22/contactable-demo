import { listContacts } from "./services/contact-services.js"

async function fetchContacts(){
  const contacts = await listContacts()
  this.contacts = contacts
  this.contacts.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
  this.favorite = contacts.filter(
    (contact) => contact.favorite == true
  )
  this.favorite.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
}
const STORE = {
  user: null,
  contacts: [],
  favorite: [],
  current_contact: null,
  fetchContacts,
  
}

export default STORE