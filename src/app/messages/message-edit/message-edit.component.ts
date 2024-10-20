import { Component, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subjectInput', {static: false}) subjectInputRef: ElementRef
  @ViewChild('messageInput', {static: false}) messageInputRef: ElementRef;
  //@Output() addMessageEvent = new EventEmitter<Message>()

  constructor(private messageService: MessageService){}

  currentSender  = 'Jessica Facer'

  onSendMessage() {
    const subName = this.subjectInputRef.nativeElement.value;
    const subMessge = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('1', subName, this.currentSender, subMessge);
    this.messageService.addMessage(newMessage);

  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
