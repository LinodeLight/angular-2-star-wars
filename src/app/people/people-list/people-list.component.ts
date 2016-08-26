import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Person, PeopleService } from '../shared';

import {
  DropdownDirective,
  notFoundImgDirective,
  SpinnerComponent,
  OrderByPipe,
  FilterByNamePipe
} from '../../shared';

@Component({
  selector: 'people-list',
  template: require('./people-list.component.html'),
  styles: [require('./people-list.component.less')],
  pipes: [
    FilterByNamePipe,
    OrderByPipe
  ],
  directives: [
    DropdownDirective,
    SpinnerComponent,
    notFoundImgDirective
  ],
  providers: [
    PeopleService
  ]
})

export class PeopleListComponent implements OnInit {
  people: Person[];
  order: string = '';
  query: string = '';
  error: string;
  loading: boolean = true;
  hasMore: boolean = false;
  private _page: number = 1;
  loadingMore: boolean = false;

  constructor(
    private _peopleService: PeopleService,
    private _router: Router
  ) {
    this.people = [];
  }

  ngOnInit () {
    this._getPeople();
  }

  private _getPeople () {
    this._peopleService
      .getPeople()
      .then(response => this._peopleCallback(response))
      .catch(error => {
        this.loading = false;
        this.error = 'Loading people details failed';
      });
  }

  loadMorePeople() {
    if(!this.hasMore || this.loadingMore) return;

    this.loadingMore = true;

    this._peopleService
      .paging(this._page)
      .then(response => this._peopleCallback(response))
      .catch(error => {
        this.loadingMore = false;
        this.error = 'Loading people details failed';
      });
  }

  gotoPersonDetail(person: Person) {
    this._router.navigate(['PersonDetail', { id: person.id }]);
  }

  private _peopleCallback(response: any) : any {

    response.results.forEach(person => this.people.push(person));

    this.loadingMore = false;
    this.loading = false;
    this.hasMore = false;

    if(response.next) {
      this._page++;
      this.hasMore = true;
    }
  }
}
