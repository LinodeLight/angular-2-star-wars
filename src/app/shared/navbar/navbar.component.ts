import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
  selector: 'navbar',
  template: require('./navbar.component.html'),
  styles: [require('./navbar.component.less')],
  directives: [
    ROUTER_DIRECTIVES
  ]
})

export class NavbarComponent {
  constructor (
    private _router: Router
  ) {}

  isActive (instruction: any[]) :boolean {
    return this._router.isRouteActive(this._router.generate(instruction));
  }
}
