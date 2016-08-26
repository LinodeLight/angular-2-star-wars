import { Component } from '@angular/core';
import {
  describe,
    expect,
    beforeEach,
    it,
    inject,
    injectAsync,
    beforeEachProviders,
    afterEach
} from '@angular/core/testing';
import { DropdownDirective } from './dropdown.directive';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';

@Component({
  selector: '[dropdown]',
  template: '',
  directives: [ DropdownDirective ]
})

export class Dropdown  {}

describe('Dropdown Directive', () => {

  beforeEach(inject([TestComponentBuilder], (testComponentBuilder: TestComponentBuilder) => {
    return testComponentBuilder
      .overrideTemplate(Dropdown, '<div class="text">Sort</div><i class="dropdown icon"></i> <div class="menu"><div class="item" (click)="sort = \'!name\'">ASC</div><div class="item" (click)="sort = \'name\'">DESC</div></div>')
      .createAsync(Dropdown)
      .then((componentFixture: ComponentFixture<Dropdown>) => this.fixture = componentFixture);
  }));

  it('Should add dropdown selector', () => {
    let fixture = this.fixture;
    const el = fixture.nativeElement;

    fixture.detectChanges();
    expect(el).toBeDefined();
  });

  afterEach(() => this.fixture.destroy());
});
