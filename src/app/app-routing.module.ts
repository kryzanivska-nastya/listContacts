import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';

const routes: Routes = [
  { path: '', component: ContactDetailsComponent },
  { path: 'add', component: AddEditContactComponent },
  { path: 'edit/:id', component: AddEditContactComponent },
  { path: 'detail/:id', component: ContactDetailsComponent },
  { path: '**', redirectTo: '' }, // Redirect invalid routes to contact list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
