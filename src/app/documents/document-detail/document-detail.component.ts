import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
  public document: Document;
  id: string;
  nativeWindow: any;
  

  constructor(private documentService: DocumentService,
              private windowRefService: WindRefService,
                private route: ActivatedRoute,
                private router: Router) {
                  this.nativeWindow = windowRefService.getNativeWindow()
                }

   ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.document = this.documentService.getDocument(this.id)
        if (!this.document) {
          console.error(`Document with id ${this.id} not found.`);
          // You may want to redirect or show a message if document is not found
        }
      }
    )
 
  }
  
       

   onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url)
    }
   }

   onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'])
 }



}
