import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router,
  ){}



  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if(!this.id) {
          this.editMode = false;
          return
        }

        this.originalContact = this.contactService.getContact(this.id);

        if(!this.originalContact) {
          return
        } 
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if(this.groupContacts) {
          this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts))
        }
      }
    )  
      
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(value.name, value.email, value.phone, value.imageUrl);

    if(this.editMode = true) {
      this.contactService.updateContact(this.originalContact, newContact)
    } else {
      this.contactService.addContact(newContact)
    }
    this.router.navigate(['/contacts'], {relativeTo: this.route})

  }

  onCancel() {
    this.router.navigate(['/contacts'], {relativeTo: this.route})
  }

  isInvalidContact(newContact: Contact) {
    if(!newContact) {
      return true;
    }

    if(this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for(let i = 0; i< this.groupContacts.length; i++) {
      if(newContact.id === this.groupContacts[i].id) {
        return true;
      }
      return false;
    }
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);

    if(invalidGroupContact) {
      return;
    }

    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if(index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1)
  }

}
