import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSelectedEvent = new EventEmitter<Message>();

  messageChangedEvent  = new Subject<Message[]>()

  private messages: Message[] = [];
  private maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
   }

   getMaxId() :number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId
    }
  }

   getMessages(){
    return this.http.get<Message[]>('https://cms-app-e455f-default-rtdb.firebaseio.com/messages.json')
    .pipe(
      tap((messages: Message[]) => {
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();

        this.messages.sort((a, b) => {
          if (a.sender < b.sender) {
            return -1
          }

          if (a.sender > b.sender) {
            return 1
          }

          return 0;
        });
      

        this.messageChangedEvent.next(this.messages.slice());
      },

      (error: any) => {
        console.error('An Error has occured: ', error);
      })
      );   
   }

   getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {

        return message;
      }
    }

    return null;

   }

   addMessage(message: Message){
    this.messages.push(message);
    this.storeMessages();
   }

   storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://cms-app-e455f-default-rtdb.firebaseio.com/messages.json', messagesString, {headers})
    .subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
   }
}
