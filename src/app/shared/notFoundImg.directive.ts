import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: 'img'
})

export class notFoundImgDirective implements OnInit  {

  @Input()
  size: string = 'default';

  $element: any;

  private _sizes = {
    default: '/assets/images/placeholder.jpg',
    wide: '/assets/images/wide-placeholder.jpg'
  };

  constructor(public el: ElementRef) {}

  ngOnInit() {
    this.$element = $(this.el.nativeElement);

    this._attachEvents();
  }

  private _attachEvents() {
    this.$element.error(this._errorLoading.bind(this));
  }

  private _errorLoading () {
    this.$element.prop('src', this._sizes[this.size]);
  }
}
