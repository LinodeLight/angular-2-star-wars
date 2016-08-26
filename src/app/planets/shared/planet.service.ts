import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CONFIG } from '../../shared/config';
import { Planet } from './planet.model';

@Injectable()

export class PlanetService {
  constructor(
    private _http: Http
  ) {}

  getPlanets () : Promise<any> {
    return this._http
      .get(CONFIG.API_URL + 'planets/')
      .toPromise()
      .then(this._extractData)
      .catch(this._errorHandler);
  }

  paging (page: number) : Promise<any> {
    return this._http
      .get(CONFIG.API_URL + `planets/?page=${page}`)
      .toPromise()
      .then(this._extractData)
      .catch(this._errorHandler);
  }

  getPlanet (id: number) : Promise<Planet> {
    return this._http
      .get(CONFIG.API_URL + `planets/${id}/`)
      .toPromise()
      .then(response => new Planet(response.json()))
      .catch(this._errorHandler);
  }

  private _extractData(response) : any {
    let data = response.json();

    data.results = data.results.map(person => new Planet(person));

    return data;
  }

  private _errorHandler (error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg);

    return Promise.reject(error);
  }
}
