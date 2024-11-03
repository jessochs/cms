import { Component, OnDestroy, OnInit,  } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit, OnDestroy {

  subscription: Subscription
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
    
  }
  
  ngOnInit() {
      this.subscription = this.contactService.contactListChanged.
      subscribe(
        (contact: Contact[]) => {
          this.contacts = contact;
        }

      )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  
  

}
