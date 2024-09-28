import { Component } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})


export class ContactDetailComponent {
  contacts: Contact[] = [
    new Contact(1, 'R. Kent Jackson', 'jacksok@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg')
  ]

}