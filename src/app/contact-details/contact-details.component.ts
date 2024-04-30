import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css',
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contact = this.contactService.getContactById(id)!;
    }
  }

  editContact() {
    if (this.contact) {
      this.router.navigate(['/edit', this.contact.id]);
    }
  }

  deleteContact() {
    if (this.contact) {
      this.contactService.deleteContact(this.contact.id);
      this.router.navigate(['/']);
    }
  }
}
