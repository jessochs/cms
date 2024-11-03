import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>()
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId()
    //console.log(this.documents)
   }

   getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId
    }

   }

   addDocument(newDocument: Document){
    if (!newDocument){
      return;
    } 

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);

   }

    updateDocument(originalDocument: Document, newDocument: Document){

    if(!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)

   }

   deleteDocument(document: Document){
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document)

    if (pos < 0) {
      return;
    }
    this.documents.slice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)
   }

   getDocuments(){
    return this.documents.slice()
   }

   getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {

        return document;
      }
    }
    console.warn(`Document with ID ${id} not found in documents.`);
    return null;
   }

//    deleteDocument(document: Document) {
//     if (!document) {
//        return;
//     }
//     const pos = this.documents.indexOf(document);
//     if (pos < 0) {
//        return;
//     }
//     this.documents.splice(pos, 1);
//     this.documentChangedEvent.emit(this.documents.slice());
//  }
}
