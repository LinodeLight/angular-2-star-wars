import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { PlanetsListComponent, PlanetDetailComponent } from './planets';
import { PeopleListComponent, PersonDetailComponent } from './people';

import { DashboardComponent } from './dashboard';
import { NavbarComponent, FooterComponent } from './shared';

@Component({
  selector: 'app',
  template:  require('./app.component.html'),
  styles: [require('./app.component.less')],
  directives: [
    NavbarComponent,
    FooterComponent,
    ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS
  ]
})

@RouteConfig([
  {
    path: '/',
    name: 'Home',
    useAsDefault: true,
    component: DashboardComponent
  },
  {
    path: '/planets',
    name: 'PlanetsList',
    component: PlanetsListComponent
  },
  {
    path: '/planet/:id',
    name: 'PlanetDetail',
    component: PlanetDetailComponent
  },
  {
    path: '/people',
    name: 'PeopleList',
    component: PeopleListComponent
  },
  {
    path: '/person/:id',
    name: 'PersonDetail',
    component: PersonDetailComponent
  }
])

export class AppComponent  {}
