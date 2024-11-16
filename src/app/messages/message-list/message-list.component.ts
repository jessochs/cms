import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit, OnDestroy {
@Input() messages: Message[] = [];

 subsription: Subscription;
 messageList: Message[] = []

 constructor(private messageService: MessageService){}

  ngOnInit() {
      this.subsription = this.messageService.getMessages()
      .subscribe(
        (messages: Message[]) => {
          this.messageList = messages;
        }
      )
  }

  onAddMessage(message: Message) {
    this.messageService.messageSelectedEvent.next(message)

  }

  ngOnDestroy(): void {
      this.subsription.unsubscribe();
  }


}
