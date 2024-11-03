import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';

const appRoutes: Routes = [
  
  {path: 'documents', component: DocumentsComponent , children: [
    {path: 'new', component: DocumentEditComponent },
    {path: ':id', component: DocumentDetailComponent},
    {path: ':id/edit', component: DocumentEditComponent },
  ]},
  
  {path: 'contacts', component: ContactsComponent, children: [
    {path: 'new', component: EditContactComponent },
    {path: ':id', component: ContactDetailComponent },
    {path: ':id/edit', component: EditContactComponent},
  ]},
  {path: 'messages', component: MessagesComponent},
  {path: '', redirectTo: 'documents', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
