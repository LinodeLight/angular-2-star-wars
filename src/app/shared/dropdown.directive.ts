import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

declare var $;

@Directive({
  selector: '[dropdown]'
})

export class DropdownDirective implements OnInit  {
  constructor(
    public el: ElementRef
  ) {}

  ngOnInit() {
    $(this.el.nativeElement).dropdown();
  }

  ngOnDestroy() {
    $(this.el.nativeElement).dropdown('destroy');
  }
}
