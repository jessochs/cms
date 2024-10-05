import { Component, EventEmitter, Output } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>()
  contacts: Contact[] = [
    new Contact(1, 'R. Kent Jackson', 'jacksok@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg'),
    new Contact(2, 'Rex Barzee',  'Barzeer@byui.edu', '208-4963768', '../../assets/images/barzeer.jpg')
  ];

  constructor() {
    
  }
  
  onContactSelected(contact: Contact){
    this.selectedContactEvent.emit(contact)

  }
  

}
