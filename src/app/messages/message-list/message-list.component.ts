import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
 @Input() messages: Message[] = [
    new Message(2, "Your Grade on the Test", "You did a great job!", 'Brother Smith'),
    new Message(3, 'Assignments For the Week', 'I gave you 100% on all your assignments for the week', 'Sister Jones'),
    new Message(4, 'School is Cancelled!', 'I hope this finds you well. School has been cancelled for the following week.', 'Logan Ochs')

  ]

  onAddMessage(message: Message) {
    this.messages.push(message)

  }
}
