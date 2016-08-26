import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CONFIG } from './config';
import { Species } from './species.model';

@Injectable()

export class SpeciesService {
  constructor(
    private _http: Http
  ) {}

  getPersonSpecies (speciesId : number) : Promise<Species> {
    return this._http
      .get(CONFIG.API_URL + `species/${speciesId}/`)
      .toPromise()
      .then(response => response.json())
      .catch(this._errorHandler);
  }

  private _errorHandler (error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg);

    return Promise.reject({
      message: error.json().detail || 'Server error',
      status: error.status
    });
  }
}
