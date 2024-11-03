import { Component,  OnDestroy,  OnInit,} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})

export class DocumentListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
 
  documentsList: Document[] = []
  documentId: string = '';
  
  constructor(private documentService: DocumentService){
    this.documentsList = this.documentService.getDocuments();
  }

  ngOnInit(){
    this.subscription =  this.documentService.documentChangedEvent.
    subscribe(
      (documentsList: Document[]) => {
        this.documentsList = documentsList;
      }
    )
      
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
