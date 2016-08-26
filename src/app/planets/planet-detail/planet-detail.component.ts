import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { Person, PeopleService } from '../../people/shared';
import { Planet, PlanetService } from '../shared';

import {
  Species,
  SpeciesService,
  SpinnerComponent,
  notFoundImgDirective
} from '../../shared';

@Component({
  selector: 'planet-detail',
  template: require('./planet-detail.component.html'),
  styles: [require('./planet-detail.component.less')],
  directives: [
    CHART_DIRECTIVES,
    SpinnerComponent,
    notFoundImgDirective
  ],
  providers: [
    PlanetService,
    PeopleService,
    SpeciesService
  ]
})

export class PlanetDetailComponent implements OnInit {
  id: number;
  planet: Planet;
  error: string;
  loading: boolean = true;
  chartDataIsReady = false;
  chartNoData = false;
  chartLoadingFailed = false;
  chartOptions = {
    credits: {
      enabled: false
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor:'rgba(255, 255, 255, 0)'
    },
    title: { text: '' },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
      }
    },
    series: [{
      colorByPoint: true,
      data: []
    }]
  };

  constructor(
    private _planetService: PlanetService,
    private _routeParams: RouteParams,
    private _peopleService: PeopleService,
    private _router: Router,
    private _speciesService: SpeciesService
  ) {}

  ngOnInit() {
    this.id = parseInt(this._routeParams.get('id'));

    if(!this.id) return this._router.navigate(['Home']);

    this._getPlanet();
  }

  private _getPlanet ()  {
    this._planetService
      .getPlanet(this.id)
      .then(planet => {
        this.planet = planet;

        this.chartOptions.title.text = `Demographic statistics of "${this.planet.name}" planet.`;

        this.loading = false;

        if(this.planet.residents.length) {
          return this._getResidents();
        }

        this.chartNoData = true;
      })
      .catch(error => {
        this.loading = false;
        this.error = 'Loading planet details failed.';
      });
  }

  private _getResidents() {
    let people = this.planet.residents;
    let peopleRequests = [];

    people.forEach(personUrl => {
      let personId = Person.parseIdFromURL(personUrl);

      peopleRequests.push(this._peopleService.getPerson(personId));
    });

    Observable.forkJoin
      .apply(this, peopleRequests)
      .subscribe(peopleList => this._fetchingPeopleSpecies(peopleList), error => {
        this.chartLoadingFailed = true;
        this.error = 'Loading people information failed.';
      });
  }

  private _fetchingPeopleSpecies(peopleList: any[]) {
    let speciesRequests = [];

    peopleList.forEach(person => {
      person.species.forEach(speciesUrl => {
        let speciesId = Species.parseIdFromURL(speciesUrl);

        speciesRequests.push(this._speciesService.getPersonSpecies(speciesId));
      });
    });

    Observable.forkJoin
      .apply(this, speciesRequests)
      .subscribe(speciesList => this._calculateChartData(speciesList), error => {
        this.chartLoadingFailed = true;
        this.error = 'Loading people species information failed.';
      })
  }

  private _calculateChartData (speciesList: any[]) {
    let data = {};
    let sum = 0;
    let chartData = [];
    let classification = [];

    speciesList.forEach(item => {
      if(item.classification in data) {
        data[item.classification]++;
      }
      else {
        data[item.classification] = 1;
      }
    });

    classification = Object.keys(data);

    classification.forEach(item => sum += data[item]);

    classification.forEach(item => {
      let y = data[item] * 100 / sum;
      let chartItemData = {
        name: item,
        y: y
      };

      chartData.push(chartItemData);
    });

    this._renderChart(chartData);
  }

  private _renderChart (data: any[]) {
    this.chartOptions.series[0].data = data;
    this.chartDataIsReady = true;
  }
}
