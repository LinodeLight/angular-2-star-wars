import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { Person, PeopleService } from '../shared';
import { Planet, PlanetService } from '../../planets/shared';

import { notFoundImgDirective, SpinnerComponent } from '../../shared';

@Component({
  selector: 'person-detail',
  template: require('./person-detail.component.html'),
  styles: [require('./person-detail.component.less')],
  directives: [
    SpinnerComponent,
    notFoundImgDirective
  ],
  providers: [
    PeopleService,
    PlanetService
  ]
})

export class PersonDetailComponent implements OnInit {
  id: number;
  person: Person;
  planet: Planet;
  error: string;
  loading: boolean = true;
  planetLoading: boolean = false;
  planetDisplaying: boolean = false;

  constructor(
    private _peopleService: PeopleService,
    private _planetService: PlanetService,
    private _routeParams: RouteParams,
    private _router: Router
  ) {}

  ngOnInit() {
    this.id = parseInt(this._routeParams.get('id'));

    if(!this.id) return this._router.navigate(['Home']);

    this._getPerson();
  }

  togglePlanetDetails() {

    this.planetDisplaying = !this.planetDisplaying;

    if(!this.planet) {
      this._getPersonPlanetInformation();
    }
  }

  private _getPerson () {
    this._peopleService
      .getPerson(this.id)
      .then(person => {
        this.loading = false;
        this.person = person;
      })
      .catch(error => {
        this.loading = false;
        this.error = 'Loading person details failed.';
      });
  }

  private _getPersonPlanetInformation () {
    let planetId = Planet.parseIdFromURL(this.person.homeworld);

    this.planetLoading = true;

    this._planetService
      .getPlanet(planetId)
      .then(planet => {
        this.planet = planet;
        this.planetLoading = false;
      })
      .catch(error => {
        this.loading = false;
        this.error = 'Loading person planet details failed.';
      });
  }
}
