import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f', {static: false}) deForm: NgForm;
  subscrption: Subscription;
  
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor( private documentService: DocumentService,
                private router: Router,
                private route: ActivatedRoute
  ) {}


  onCancel() {
    this.router.navigate(['/documents'], {relativeTo: this.route})
  }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
       const id = params['id'];

       if (!this.id) {
        this.editMode = false;
        return;
       } 
      //originalDocument = this.documentService.getDocument(this.id)

       if (!this.originalDocument) {
        return
       }

       this.editMode = true;
       this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )

      
  }

  onSubmit(form: NgForm) {
    // const value = form.value;
    // const newDocument = new Document(value.name, value.description, value.url);

    // if (this.editMode = true) {
    //   this.documentService.updateDocument(this.originalDocument, newDocument);

    // } else {
    //   this.documentService.addDocument(newDocument)
    // }
    // this.router.navigate(['/documents'], {relativeTo: this.route})


  }
}
