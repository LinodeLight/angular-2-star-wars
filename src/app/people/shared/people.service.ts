import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../../shared/config';
import { Person } from './person.model';

@Injectable()

export class PeopleService {

  constructor(
    private _http: Http
  ) {}

  getPeople () : Promise<any> {
    return this._http
      .get(CONFIG.API_URL + 'people/')
      .toPromise()
      .then(this._extractData)
      .catch(this._errorHandler);
  }

  getPerson (id: number) : Promise<Person> {
    return this._http
      .get(CONFIG.API_URL + `people/${id}/`)
      .toPromise()
      .then(response => new Person(response.json()))
      .catch(this._errorHandler);
  }

  paging (page: number) : Promise<any> {
    return this._http
      .get(CONFIG.API_URL + `people/?page=${page}`)
      .toPromise()
      .then(this._extractData)
      .catch(this._errorHandler);
  }

  private _extractData(response: any) : any {
    let data = response.json();

    data.results = data.results.map(person => new Person(person));

    return data;
  }


  private _errorHandler (error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg);

    return Promise.reject(error);
  }
}
