import { Component, OnInit,Input } from '@angular/core';
import {Person} from '../person'
import {PeopleService} from '../people.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html'
})
export class PersonDetailsComponent implements OnInit {

  person : Person;
  sub: any;
  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
      let id = Number.parseInt(params['id']);
      this.peopleService.getId(id).subscribe(p => this.person =p);
    });
  }

  savePersonDetails(){
        this.peopleService.save(this.person);
        alert(`saved!!! ${JSON.stringify(this.person)}`);
    }
  goToPeopleList(){
    let link = ['']
    this.router.navigate(link);
  }

}
