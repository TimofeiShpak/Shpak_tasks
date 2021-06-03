import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent {
  @Input() name: string = '';
  @Input() value: number = 50;
  get title() {
    return this.name[0].toUpperCase() + this.name.slice(1);
  }
  get width() {
    return this.value + '%';
  }
  get classNameProgressBar() {
    return `indicator__progressBar indicator__progressBar_${this.name}`;
  }
  get classNameTitle() {
    return `indicator__title_${this.name}`;
  }
  get classNameProgress() {
    return `indicator__progress indicator__progress_${this.name}`;
  }
}
