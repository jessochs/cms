import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChanged = new Subject<Contact[]>()
  // contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    console.log(this.contacts)
  }

  getMaxId() :number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId
    }
  }

  addContact(newContact: Contact){
    if (!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    const contactsListClone = this.contacts.slice();
    this.contactListChanged.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if (!originalContact || !newContact){
      return;
    }
    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    const contactsListClone = this.contacts.slice();
    this.contactListChanged.next(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (!contact){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.slice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactListChanged.next(contactsListClone);
  }


  getContacts(){
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {

        return contact;
      }
    }

    return null;
   } 

  //  deleteContact(contact: Contact){
  //   if (!contact) {
  //     return;
  //  }
  //  const pos = this.contacts.indexOf(contact);
  //     if (pos < 0) {
  //     return;
  //  }
  //   this.contacts.splice(pos, 1);
  //   this.contactChangedEvent.emit(this.contacts.slice());


  //  }


  
}
