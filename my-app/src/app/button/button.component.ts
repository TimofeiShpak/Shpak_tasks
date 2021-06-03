import { Component, Input } from '@angular/core';
import store from '../store/store';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() button: string = '';
  get className() {
    return `btn btn_${this.button}`;
  }
  changeValue() {
    store.changeValue(this.button);
  }
}
