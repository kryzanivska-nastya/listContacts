import { Component, OnInit } from '@angular/core';
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
      const contactData = this.contactForm.value;
      if (this.isNew) {
        this.contactService.addContact(contactData);
      } else {
        this.contactService.editContact(contactData);
      }
      this.router.navigate(['/']);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  deleteContact() {
    if (!this.isNew) {
      const id = this.contactForm.value.id;
      this.contactService.deleteContact(id);
      this.router.navigate(['/']);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
