import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>()
  documents: Document[] = [
    new Document(1, 'Midterm', 'This is the midterm paper', 'byui.edu'),
    new Document(2, 'Final Test', 'This is the final test for cse 430', 'byui.edu'),
    new Document(3, 'Week04 project', 'Weekly project for week 04', 'byui.edu'),
    new Document(4, 'Bowling Alley App', 'TApp that creates a bowling game', 'byui.edu'),
    new Document(5, 'Save Hogwarts App', 'Harry Potter Simulation', 'byui.edu'),
  ]
  constructor(){}

  ngOnInit(){
      
  }

  onDocumentSelected(document: Document) {
    this.selectedDocumentEvent.emit(document)
  }
}
