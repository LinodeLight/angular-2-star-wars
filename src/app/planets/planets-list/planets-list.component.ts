import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { PlanetService, Planet } from '../shared';
import { SpinnerComponent, notFoundImgDirective } from '../../shared';

@Component({
  selector: 'planets-list',
  template: require('./planets-list.component.html'),
  styles: [require('./planets-list.component.less')],
  directives: [
    SpinnerComponent,
    notFoundImgDirective
  ],
  providers: [
    PlanetService
  ]
})

export class PlanetsListComponent implements OnInit {
  page: number = 1;
  planets: Planet[];
  error: string;
  loading: boolean = true;
  hasMore: boolean = false;
  loadingMore: boolean = false;

  constructor(
    private _planetService: PlanetService,
    private _router: Router
  ) {
    this.planets = [];
  }

  ngOnInit() {
    this._getPlanets();
  }

  private _getPlanets () {
    this._planetService
      .getPlanets()
      .then(response => this._planetResults(response))
      .catch(error => {
        this.loading = false;
        this.error = 'Loading planets failed.';
      });
  }

  loadMorePlanets ()  {
    if(!this.hasMore || this.loadingMore) return;

    this.loadingMore = true;

    this._planetService
      .paging(this.page)
      .then(response => this._planetResults(response))
      .catch(error => {
        this.loading = false;
        this.error = 'Loading planets failed.';
      });
  }

  gotoPlanetDetail (planet: Planet)  {
    this._router.navigate(['PlanetDetail', { id: planet.id }]);
  }

  private _planetResults (response: any) {
    response.results.forEach(planet => this.planets.push(planet));

    this.loadingMore = false;
    this.loading = false;
    this.hasMore = false;

    if(response.next) {
      this.page++;
      this.hasMore = true;
    }
  }
}
