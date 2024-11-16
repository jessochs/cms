import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DocumentService {
 private documentListChangedEvent = new Subject<Document[]>();
  startedEditing = new Subject<number>;

  // documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
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
    this.storeDocuments();

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
    // const documentsListClone = this.documents.slice();
    this.storeDocuments();

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
    this.storeDocuments();
   }

   getDocuments(){
    return this.http.get<Document[]>('https://cms-app-e455f-default-rtdb.firebaseio.com/documents.json')
    .pipe(
      tap((documents: Document[]) => {
        this.documents = documents || [];
        this.maxDocumentId = this.getMaxId();

        this.documents.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }

          if (a.name > b.name) {
            return 1
          }

          return 0;
        });
      

        this.documentListChangedEvent.next(this.documents.slice());
      },

      (error: any) => {
        console.error('An Error has occured: ', error);
      })
      );   
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

   storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://cms-app-e455f-default-rtdb.firebaseio.com/documents.json', documentsString, {headers})
    .subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
   }

   
  }
