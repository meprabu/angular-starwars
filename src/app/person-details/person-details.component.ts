import { Component, OnInit,Input } from '@angular/core';
import {Person} from '../person'
import {PeopleService} from '../people.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-details',
  template: `
  <section *ngIf="person">
    <h3>You Selected: {{person.name}} </h3>
      <h3>Description </h3>
      He weighs {{person.weight}} and is {{person.height}} tall.
  </section>
  <button (click)='goToPeopleList()'>Back to List</button>
  `,
  styles: []
})
export class PersonDetailsComponent implements OnInit {

  person : Person;
  sub: any;
  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
      let id = Number.parseInt(params['id']);
      this.person = this.peopleService.getId(id);
    });
  }

  goToPeopleList(){
    let link = ['']
    this.router.navigate(link);
  }

}
