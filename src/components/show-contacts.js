import { Contact } from "./contact.js";


export function ShowContacts({ contacts, areFavorites }) {
  const title = areFavorites ? "Favorites" : `Contacts(${contacts.length})`;
  return contacts.length > 0
    ?  `<span class="overline heading--xs text-xl">${title}</span>
    <hr></hr>
  ${contacts
    .map((contact) => Contact({ contact: contact, isFavorite: areFavorites }))
    .join("")}`

    : "";
}