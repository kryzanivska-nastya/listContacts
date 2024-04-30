import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'detail/:id', component: ContactDetailsComponent },
  // Add routes for add and edit contact components
];
@NgModule({
  declarations: [AppComponent, ContactDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
