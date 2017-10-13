import { Injectable } from '@angular/core';
import {Person} from './person';
import {Http, Response, Headers } from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx'



  const PEOPLE : Person[] =  [
  {id:1, name: 'Luke Skywalker', height: 177, weight: 70},
  {id:2, name: 'Darth Vader', height: 200, weight: 100},
  {id:3, name: 'Han Solo', height: 185, weight: 85}
];




@Injectable()
export class PeopleService {

  private baseUrl: string = 'https://swapi.co/api';

  //private PEOPLE : Person[];

  constructor(private http: Http) { }

  getAllOnline() : Observable <Person[]>{
    //let people$ = this.http.get('${this.baseUrl}/people',{headers: this.getHeaders()}).map(mapPersons);
    let peopleObs = this.http
   .get(`${this.baseUrl}/people`, { headers: this.getHeaders()})
   .map(mapPersons);
   console.log(peopleObs);
   return peopleObs;
  }



  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  /*
  * @returns      Comment for special return value.
  *This method returns number of starwars persons
  */
  getAll() : Person[] {
      return PEOPLE;
  }

  getId(id: number) : Observable<Person> {
    let person$ = this.http.get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()}).map(mapPerson);
    return person$;
    //return PEOPLE.find(p => p.id === id)
  }

  save(person: Person){
    let originalPerson = PEOPLE.find(p => p.id === person.id);
    if (originalPerson) Object.assign(originalPerson, person);
    // saved moahahaha
  }

  private clone(object: any){
    // hack
    return JSON.parse(JSON.stringify(object));
  }

}

function mapPersons(response:Response) : Person[] {
  return response.json().results.map(toPerson);
}

function toPerson(result:any) : Person{
  let person = <Person>({
    id: extractId(result),
    name: result.name,
    weight: Number.parseInt(result.mass),
    height: Number.parseInt(result.height)
  });
//  console.log(person);
  return person;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(personData:any){
  let extractedId = personData.url.replace('https://swapi.co/api/people/','').replace('/','');
  return parseInt(extractedId);
}

function mapPerson(response: Response): Person{
  return toPerson(response.json());
}
