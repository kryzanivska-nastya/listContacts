import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private localStorageKey = 'contacts';

  constructor() {}

  getContactsFromLocalStorage(): Contact[] {
    const contactsStr = localStorage.getItem(this.localStorageKey);
    return contactsStr ? JSON.parse(contactsStr) : [];
  }

  saveContactsToLocalStorage(contacts: Contact[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
  }

  getContactById(id: string): Contact | null {
    const contacts = this.getContactsFromLocalStorage();
    const contact = contacts.find((contact) => contact.id === id);
    return contact ? contact : null;
  }

  addContact(contact: Contact) {
    const contacts = this.getContactsFromLocalStorage();
    contacts.push(contact);
    this.saveContactsToLocalStorage(contacts);
  }

  editContact(contact: Contact) {
    let contacts = this.getContactsFromLocalStorage();
    contacts = contacts.map((c) => (c.id === contact.id ? contact : c));
    this.saveContactsToLocalStorage(contacts);
  }

  deleteContact(id: string) {
    let contacts = this.getContactsFromLocalStorage();
    contacts = contacts.filter((contact) => contact.id !== id);
    this.saveContactsToLocalStorage(contacts);
  }
}
