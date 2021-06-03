import { Component } from '@angular/core';
import store from '../store/store';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  get actions() {
    return store.allActions;
  }
}
