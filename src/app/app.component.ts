import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contact.model';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  searchTerm: string = '';
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  title: any;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContactsFromLocalStorage();
    this.filteredContacts = this.contacts;
  }

  searchContacts() {
    this.filteredContacts = this.contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }
}
