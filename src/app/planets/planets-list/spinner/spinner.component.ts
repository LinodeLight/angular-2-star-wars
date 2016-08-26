import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: require('./spinner.component.html'),
  styles: [require('./spinner.component.less')]
})

export class SpinnerComponent {
  @Input()
  text: string;

  @Input()
  show: boolean = false;
}
