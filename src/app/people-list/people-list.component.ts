import { Component, OnInit } from '@angular/core';
import {Person} from '../person'
import {PeopleService} from '../people.service'

@Component({
  selector: 'app-people-list',
  template: `
    <!-- this is the new syntax for ng-repeat -->
    <ul class="list-group">
      <li  *ngFor="let person of people">
         <a class="list-group-item list-group-item-action" [routerLink]="['/persons', person.id]">
          {{person.name}}
          </a>
      </li>
    </ul>
  `,
  styleUrls: ['./people-list.component.css']
})

export class PeopleListComponent implements OnInit {

  people: Person[];
  selectedPerson : Person;

  constructor(private peopleService:PeopleService) {
    //this.people = peopleService.getAll();
    peopleService.getAllOnline().subscribe(
      p => this.people = p
    );
  }

  ngOnInit() {
  }

  selectPerson(person){
    this.selectedPerson = person;
  }
}
