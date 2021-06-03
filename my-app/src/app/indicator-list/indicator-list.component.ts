import { Component } from '@angular/core';
import store from '../store/store';

@Component({
  selector: 'app-indicator-list',
  templateUrl: './indicator-list.component.html',
  styleUrls: ['./indicator-list.component.scss']
})
export class IndicatorListComponent {
  get options() { 
    return store.options;
  }
}
