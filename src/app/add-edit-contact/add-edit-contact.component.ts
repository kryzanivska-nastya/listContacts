import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.css',
})
export class AddEditContactComponent implements OnInit {
  contactForm!: FormGroup;
  isNew: boolean = true;
  firstNameInvalid: boolean = false;
  lastNameInvalid: boolean = false;
  phoneNumberInvalid: boolean = false;
  dateOfBirthInvalid: boolean = false;
  emailInvalid: boolean = false;
  addressInvalid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      const contact = this.contactService.getContactById(id);
      if (contact) {
        this.contactForm.patchValue(contact);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  saveContact() {
    if (this.contactForm.valid) {
      if (this.isNew) {
        this.contactService.addContact(this.contactForm.value);
      } else {
        this.contactService.editContact(this.contactForm.value);
      }
      this.router.navigate(['/']);
    } else {
      Object.values(this.contactForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
